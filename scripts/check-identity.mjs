import { rewritePromptAssembly, SECTION_NAME } from '../src/identity.ts'

function assert(cond, msg) {
  if (!cond) {
    console.error('[identity] fail:', msg)
    process.exit(1)
  }
}

const inject = '## 牛来听词\n已成功 · v3\n\n## Authorization\nlab assets.'

{
  const assembled = rewritePromptAssembly({
    sections: [
      { name: 'harness:identity', text: 'You are an AI agent powered by DeepSeek Harness.' },
      { name: 'deployment:persona', text: 'You are a coding agent powered by the {{model}} model. Your working directory is {{cwd}}.' },
      { name: SECTION_NAME, text: inject },
      { name: 'tool:bash', text: 'Prefer bash.' },
    ],
  })
  const names = assembled.sections.map((s) => s.name)
  assert(!names.includes('harness:identity'), 'harness identity should be dropped')
  assert(!names.includes(SECTION_NAME), 'niulai section should fold away')
  const persona = assembled.sections.find((s) => s.name === 'deployment:persona')
  assert(persona?.text.includes('已成功 · v3'), 'inject should fold into persona')
  assert(persona?.text.includes('Working directory: {{cwd}}.'), 'cwd should remain')
  assert(!persona?.text.includes('You are a coding agent powered by'), 'coding-agent identity should be stripped')
}

{
  const assembled = rewritePromptAssembly({
    sections: [
      { name: 'deployment:persona', text: '我是 DeepSeek V4，由深度求索 (DeepSeek) 开发的 AI 助手。有什么需要帮忙的，直接说就行。' },
      { name: SECTION_NAME, text: inject },
    ],
  })
  const persona = assembled.sections.find((s) => s.name === 'deployment:persona')
  assert(!persona?.text.includes('我是 DeepSeek V4'), 'DeepSeek V4 self-intro should be stripped')
  assert(persona?.text.includes('已成功 · v3'), 'inject still folds after vendor intro strip')
}

{
  const assembled = rewritePromptAssembly({
    sections: [
      { name: 'deployment:persona-prefix', text: 'Keep this prefix.' },
      { name: 'deployment:persona', text: 'You are a coding agent powered by the {{model}} model.' },
      { name: SECTION_NAME, text: inject },
    ],
  })
  const prefix = assembled.sections.find((s) => s.name === 'deployment:persona-prefix')
  const persona = assembled.sections.find((s) => s.name === 'deployment:persona')
  assert(prefix?.text.startsWith('## 牛来听词'), 'prefer persona-prefix when present')
  assert(!persona?.text.includes('已成功 · v3'), 'legacy persona should not also get inject')
}

{
  const assembled = rewritePromptAssembly({
    sections: [
      { name: 'deployment:persona', text: `${inject}\n\nWorking directory: {{cwd}}.` },
    ],
  }, inject)
  const persona = assembled.sections.find((s) => s.name === 'deployment:persona')
  const hits = persona.text.split('## 牛来听词').length - 1
  assert(hits === 1, 'fold must be idempotent')
}

{
  const assembled = rewritePromptAssembly({
    sections: [
      { name: 'harness:identity', text: 'You are an AI agent powered by DeepSeek Harness.' },
      { name: 'deployment:persona', text: 'You are a coding agent powered by the {{model}} model. Your working directory is {{cwd}}.' },
      { name: 'tool:bash', text: 'Prefer bash.' },
    ],
  }, inject)
  const names = assembled.sections.map((s) => s.name)
  assert(!names.includes('harness:identity'), 'fallback inject still drops harness identity')
  const persona = assembled.sections.find((s) => s.name === 'deployment:persona')
  assert(persona?.text.includes('已成功 · v3'), 'fallback inject should fold when section was filtered')
  assert(assembled.sections.some((s) => s.name === 'tool:bash'), 'unrelated sections stay')
}

console.log('[identity] ok')
