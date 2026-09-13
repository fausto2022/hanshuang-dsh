// Fold niulai inject into persona so Liangshen phase-1 still sees it.
// Strip official Harness identity sentences while inject is on.
// No second identity card, no LCS / operator lock.

export const SECTION_NAME = 'niulai-system-spec'

const PERSONA_PREFIX_NAMES = new Set([
  'deployment:persona-prefix',
  'persona-prefix',
])
const PERSONA_LEGACY_NAMES = new Set(['deployment:persona', 'persona'])

type AssembledSection = { name?: string; text?: string; [key: string]: unknown }
type PromptAssembly = { sections?: AssembledSection[]; [key: string]: unknown }

function stripHarnessPersona(text: string) {
  if (!text) return text
  return text
    .replace(/You are an AI agent powered by DeepSeek Harness\.?\s*/g, '')
    .replace(/You are a helpful software engineer assistant\.?\s*/gi, '')
    .replace(/你是一个有帮助的软件工程师助手[。.]?\s*/g, '')
    .replace(/我是 DeepSeek(?:驱动)?的? AI(?:编程)?助手[，,]?[^\n]*/g, '')
    .replace(/我是 DeepSeek[^\n]*/g, '')
    .replace(/由深度求索[^\n]*/g, '')
    .replace(/你好！?我是 DeepSeek[^\n]*/g, '')
    .replace(
      /You are interacting with the user through the DeepSeek Harness Web GUI/g,
      'You are interacting with the user through the local web GUI',
    )
    .replace(
      /You are a coding agent powered by the \{\{model\}\} model, running on the DeepSeek Harness\. Your working directory is \{\{cwd\}\}\.?\s*/g,
      'Working directory: {{cwd}}. ',
    )
    .replace(
      /You are a coding agent powered by the \{\{model\}\} model, running on the DeepSeek Harness\.?\s*/g,
      '',
    )
    .replace(
      /You are a coding agent powered by the \{\{model\}\} model\. Your working directory is \{\{cwd\}\}\.?\s*/g,
      'Working directory: {{cwd}}. ',
    )
    .replace(
      /You are a coding agent powered by the [^\n.]+ model, running on the DeepSeek Harness\.?\s*/g,
      '',
    )
    .replace(/You are a coding agent powered by the [^\n.]+ model\.?\s*/g, '')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/ \n/g, '\n')
    .trim()
}

function collectInjectText(niulaiSections: AssembledSection[], fallbackText: string) {
  const fromSections = niulaiSections
    .map((section) => String(section.text || '').trim())
    .filter(Boolean)
    .join('\n\n')
    .trim()
  if (fromSections) return fromSections
  return typeof fallbackText === 'string' ? fallbackText.trim() : ''
}

function alreadyFolded(prior: string, inject: string) {
  if (!inject) return true
  const needle = inject.slice(0, Math.min(80, inject.length))
  return Boolean(needle) && prior.includes(needle)
}

function isPersonaFoldTarget(name: string, preferPrefix: boolean) {
  if (preferPrefix) return PERSONA_PREFIX_NAMES.has(name)
  return PERSONA_PREFIX_NAMES.has(name) || PERSONA_LEGACY_NAMES.has(name)
}

function foldInjectIntoPersona(sections: AssembledSection[], injectText: string) {
  const inject = typeof injectText === 'string' ? injectText.trim() : ''
  const names = sections.map((section) => String(section?.name || ''))
  const hasPrefix = names.some((name) => PERSONA_PREFIX_NAMES.has(name))
  let folded = false
  const out = sections.map((section) => {
    const name = String(section?.name || '')
    if (!isPersonaFoldTarget(name, hasPrefix)) return section
    folded = true
    const prior = String(section.text || '').trim()
    if (!inject) return { ...section, text: prior }
    if (alreadyFolded(prior, inject)) return { ...section, text: prior }
    return { ...section, text: prior ? `${inject}\n\n${prior}` : inject }
  })
  if (folded) return { sections: out, folded: true }
  if (!inject) return { sections: out, folded: false }
  return {
    sections: [{ name: 'deployment:persona-prefix', text: inject }, ...out],
    folded: true,
  }
}

export function rewritePromptAssembly(assembled: PromptAssembly, fallbackInject = '') {
  if (!assembled || !Array.isArray(assembled.sections)) return assembled
  const rest: AssembledSection[] = []
  const niulai: AssembledSection[] = []
  for (const section of assembled.sections) {
    if (!section || section.name === 'harness:identity') continue
    const next = { ...section }
    const name = String(next.name || '')
    const isNiulai = name === SECTION_NAME || name.startsWith('niulai-')
    if (typeof next.text === 'string' && !isNiulai) {
      next.text = stripHarnessPersona(next.text)
    }
    if (isNiulai) niulai.push(next)
    else rest.push(next)
  }

  const injectText = collectInjectText(niulai, fallbackInject)
  if (!injectText) {
    assembled.sections = rest
    return assembled
  }

  const folded = foldInjectIntoPersona(rest, injectText)
  assembled.sections = folded.folded ? folded.sections : [...folded.sections, ...niulai]
  return assembled
}

export function installIdentityOverride(ctx, getInjectText: () => string | null) {
  if (typeof ctx.on !== 'function') return () => {}

  let disposed = false
  const hook = async (_assembly, _context, next) => {
    const assembled = typeof next === 'function' ? await next() : _assembly
    if (disposed) return assembled
    const fallback = getInjectText() ?? ''
    if (!fallback && !assembled?.sections?.some((section) => {
      const name = String(section?.name || '')
      return name === SECTION_NAME || name.startsWith('niulai-')
    })) {
      return assembled
    }
    return rewritePromptAssembly(assembled, fallback)
  }

  const disposers: Array<() => void> = []
  const listen = (opts: { prepend: boolean }) => {
    if (disposed) return
    try {
      const dispose = ctx.on('system-prompt/assemble', hook, { global: true, prepend: opts.prepend })
      if (typeof dispose === 'function') disposers.push(dispose)
    } catch {
      /* older hosts may reject unknown event options */
    }
  }

  listen({ prepend: false })
  listen({ prepend: true })

  let lateTimer: ReturnType<typeof setTimeout> | undefined
  const late = () => {
    listen({ prepend: true })
  }
  queueMicrotask(late)
  lateTimer = setTimeout(late, 1500)

  return () => {
    disposed = true
    if (lateTimer) clearTimeout(lateTimer)
    for (const dispose of disposers.splice(0)) {
      try { dispose() } catch { /* already gone */ }
    }
  }
}
