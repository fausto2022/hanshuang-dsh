import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export const inject = ['slots']
export const immediately = true

const API = '/dsh-niulai'
const TAG_ID = 'dsh-niulai/NiulaiSettings.module.css'

type PromptKind = 'builtin' | 'custom' | 'env' | 'default'
type PromptItem = {
  id: string
  name: string
  description: string
  kind: PromptKind
  overridden: boolean
  chars: number
  active: boolean
  text: string
}
type State = {
  ok?: boolean
  enabled: boolean
  activeId: string
  storedId?: string
  items: PromptItem[]
  envPath: string | null
  configFile: string
  importedId?: string
  activationWord?: string
  activationReply?: string
  activationPreview?: string
}

const CSS = `
.hs-root{width:100%;max-width:760px;color:var(--dsw-alias-label-primary);flex-direction:column;gap:16px;padding:4px 2px 24px;display:flex;box-sizing:border-box}
.hs-head{flex-direction:column;gap:6px;display:flex}
.hs-kicker{color:var(--dsw-alias-label-tertiary);letter-spacing:.08em;text-transform:uppercase;font-size:11px;line-height:16px}
.hs-title{margin:0;font-size:20px;font-weight:600;line-height:28px}
.hs-lead{margin:0;color:var(--dsw-alias-label-secondary);font-size:13px;line-height:20px}
.hs-guide{margin:0;color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px}
.hs-switch{border:.5px solid var(--dsw-alias-border-l3);background:var(--dsw-alias-bg-layer-3);border-radius:14px;padding:12px 14px;align-items:center;gap:12px;display:flex}
.hs-switchBody{flex:1;min-width:0;flex-direction:column;gap:4px;display:flex}
.hs-switchTitle{font-size:14px;font-weight:600;line-height:20px}
.hs-switchMeta{color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px}
.hs-toggle{flex:none;width:44px;height:26px;border:.5px solid var(--dsw-alias-border-l3);background:var(--dsw-alias-bg-layer-1);border-radius:999px;padding:2px;cursor:pointer}
.hs-toggle[data-on=true]{background:var(--dsw-alias-state-business-primary);border-color:transparent}
.hs-toggle span{width:20px;height:20px;background:#fff;border-radius:50%;display:block}
.hs-toggle[data-on=true] span{margin-left:18px}
.hs-banner{border:.5px solid var(--dsw-alias-border-l3);background:var(--dsw-alias-bg-layer-3);border-radius:12px;padding:10px 12px;color:var(--dsw-alias-label-secondary);font-size:12px;line-height:18px}
.hs-banner[data-tone=ok]{border-color:color-mix(in srgb, var(--dsw-alias-state-business-primary) 40%, var(--dsw-alias-border-l3));color:var(--dsw-alias-label-primary)}
.hs-banner[data-tone=err]{border-color:color-mix(in srgb, var(--dsw-alias-state-error-primary) 45%, var(--dsw-alias-border-l3));color:var(--dsw-alias-state-error-primary)}
.hs-grid{margin:0;padding:0;list-style:none;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;display:grid;align-items:stretch}
.hs-grid>li{min-width:0;display:flex}
.hs-card{text-align:left;cursor:pointer;min-width:0;width:100%;min-height:148px;border:.5px solid var(--dsw-alias-border-l3);background:var(--dsw-alias-bg-layer-3);border-radius:14px;padding:12px 14px;color:inherit;font:inherit;display:flex;flex-direction:column;gap:8px;box-sizing:border-box}
.hs-card:hover{background:var(--dsw-alias-interactive-bg-hover)}
.hs-card[data-active=true]{border-color:var(--dsw-alias-state-business-primary);box-shadow:0 0 0 1px var(--dsw-alias-state-business-primary)}
.hs-cardName{font-size:14px;font-weight:600;line-height:20px}
.hs-cardFit{color:var(--dsw-alias-state-business-primary);font-size:11px;line-height:16px;letter-spacing:.04em}
.hs-cardMeta{color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px;min-height:36px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.hs-tags{margin-top:auto;align-items:center;gap:6px;display:flex;flex-wrap:wrap}
.hs-tag{border:.5px solid var(--dsw-alias-border-l3);border-radius:999px;padding:1px 8px;color:var(--dsw-alias-label-tertiary);font-size:11px;line-height:16px}
.hs-tag[data-tone=on]{color:var(--dsw-alias-state-business-primary);border-color:color-mix(in srgb, var(--dsw-alias-state-business-primary) 50%, var(--dsw-alias-border-l3))}
.hs-editor{flex-direction:column;gap:10px;display:flex}
.hs-label{color:var(--dsw-alias-label-secondary);font-size:12px;line-height:18px}
.hs-input,.hs-area{box-sizing:border-box;width:100%;border:.5px solid var(--dsw-alias-border-l4);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);border-radius:10px;padding:8px 10px;font:inherit;outline:none}
.hs-input{height:36px;font-size:13px}
.hs-area{min-height:280px;resize:vertical;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:12px;line-height:18px}
.hs-input:focus-visible,.hs-area:focus-visible{border-color:var(--dsw-alias-state-business-primary);box-shadow:0 0 0 2px color-mix(in srgb, var(--dsw-alias-state-business-primary) 18%, transparent)}
.hs-row{align-items:center;gap:8px;display:flex}
.hs-spacer{flex:1}
.hs-btn{height:32px;border:.5px solid var(--dsw-alias-border-l3);background:0 0;color:var(--dsw-alias-label-primary);border-radius:8px;padding:0 12px;font:inherit;font-size:13px;cursor:pointer}
.hs-btn:hover{background:var(--dsw-alias-interactive-bg-hover)}
.hs-btn[data-kind=primary]{background:var(--dsw-alias-state-business-primary);border-color:transparent;color:#fff}
.hs-btn:disabled{opacity:.45;cursor:default}
.hs-hidden{clip:rect(0 0 0 0);width:1px;height:1px;position:absolute;overflow:hidden}
.hs-status{margin:0;color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px}
.hs-latch{border:.5px solid var(--dsw-alias-border-l3);background:var(--dsw-alias-bg-layer-3);border-radius:14px;padding:12px 14px;flex-direction:column;gap:10px;display:flex}
.hs-latchTitle{font-size:14px;font-weight:600;line-height:20px}
.hs-latchMeta{color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px}
.hs-latchPreview{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:13px;line-height:20px;color:var(--dsw-alias-label-primary)}
.hs-latchGrid{grid-template-columns:1fr 1fr auto;gap:8px;display:grid;align-items:end}
@media (max-width:640px){.hs-grid{grid-template-columns:minmax(0,1fr)}.hs-latchGrid{grid-template-columns:minmax(0,1fr)}}
`

function ensureCss() {
  if (typeof document === 'undefined') return
  if (document.querySelector(`style[data-plugin-css=${JSON.stringify(TAG_ID)}]`)) return
  const tag = document.createElement('style')
  tag.dataset.plugin = 'dsh-niulai'
  tag.dataset.pluginCss = TAG_ID
  tag.textContent = CSS
  document.head.appendChild(tag)
}

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    credentials: 'same-origin',
    headers: { Accept: 'application/json', ...(init?.body ? { 'Content-Type': 'application/json' } : {}) },
    ...init,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok || data?.ok === false) throw new Error(data?.error || `请求失败 (${res.status})`)
  return data as T
}

function kindLabel(kind: PromptKind) {
  if (kind === 'builtin') return '内置'
  if (kind === 'custom') return '自定义'
  if (kind === 'default') return '默认'
  return '环境变量'
}

function fitLabel(id: string, kind: PromptKind) {
  if (id === 'v3') return '推荐 · DeepSeek / Qwen / Sonnet'
  if (id === 'flash') return '中端 · Flash / Haiku / mini'
  if (id === 'variant-b') return '顶级英文 · Opus / GPT-5 / Grok 4'
  if (id === 'astra') return '思考席 · DeepSeek reasoner'
  if (kind === 'default') return '关闭注入'
  if (kind === 'env') return '环境变量优先'
  return '自定义套'
}

function NiulaiSettings() {
  const [state, setState] = useState<State | null>(null)
  const [selectedId, setSelectedId] = useState('')
  const [draft, setDraft] = useState('')
  const [draftName, setDraftName] = useState('')
  const [importName, setImportName] = useState('')
  const [importText, setImportText] = useState('')
  const [wordDraft, setWordDraft] = useState('牛来')
  const [replyDraft, setReplyDraft] = useState('已成功')
  const [busy, setBusy] = useState('')
  const [notice, setNotice] = useState<{ tone: 'ok' | 'err' | 'info'; text: string } | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const selectedIdRef = useRef('')
  selectedIdRef.current = selectedId

  const applyState = useCallback((next: State, preferId?: string) => {
    setState(next)
    const want = preferId || selectedIdRef.current || next.activeId
    const current = next.items.find((item) => item.id === want)
      ?? next.items.find((item) => item.id === next.activeId)
      ?? next.items[0]
    if (!current) return
    setSelectedId(current.id)
    setDraft(current.text)
    setDraftName(current.name)
    setWordDraft(next.activationWord || '牛来')
    setReplyDraft(next.activationReply || '已成功')
  }, [])

  const load = useCallback(async () => {
    setBusy('load')
    try {
      const next = await api<State>('/state')
      applyState(next, next.activeId)
      setNotice(null)
    } catch (error) {
      setNotice({ tone: 'err', text: error instanceof Error ? error.message : String(error) })
    } finally {
      setBusy('')
    }
  }, [applyState])

  useEffect(() => {
    ensureCss()
    void load()
  }, [load])

  const selected = useMemo(
    () => state?.items.find((item) => item.id === selectedId) ?? null,
    [state, selectedId],
  )
  const dirty = Boolean(selected && selected.kind !== 'default' && (draft !== selected.text || (selected.kind === 'custom' && draftName !== selected.name)))
  const readOnly = selected?.kind === 'env' || selected?.kind === 'default'

  const run = async (key: string, work: () => Promise<State>, okText: string, preferId?: string) => {
    setBusy(key)
    try {
      const next = await work()
      applyState(next, preferId ?? next.importedId)
      setNotice({ tone: 'ok', text: okText })
    } catch (error) {
      setNotice({ tone: 'err', text: error instanceof Error ? error.message : String(error) })
    } finally {
      setBusy('')
    }
  }

  const selectCard = (item: PromptItem) => {
    if (item.id === selectedId) return
    if (dirty && !window.confirm('当前编辑尚未保存，切换后会丢失。继续？')) return
    setSelectedId(item.id)
    setDraft(item.text)
    setDraftName(item.name)
  }

  const onImportFile = async (file: File) => {
    const text = await file.text()
    setImportText(text)
    if (!importName.trim()) setImportName(file.name.replace(/\.(md|txt)$/i, ''))
  }

  if (!state) {
    return React.createElement('div', { className: 'hs-root' },
      React.createElement('p', { className: 'hs-status' }, busy ? '正在读取牛来配置…' : (notice?.text ?? '未能读取配置')),
      notice?.tone === 'err' ? React.createElement('button', { className: 'hs-btn', type: 'button', onClick: () => void load() }, '重试') : null,
    )
  }

  return React.createElement('div', { className: 'hs-root' },
    React.createElement('header', { className: 'hs-head' },
      React.createElement('div', { className: 'hs-kicker' }, 'NIULAI'),
      React.createElement('h2', { className: 'hs-title' }, '牛来提示词'),
      React.createElement('p', { className: 'hs-lead' }, '选择注入 Agent 的系统提示词。不想用时恢复 DSH 默认，后续对话立即不再注入牛来。'),
      React.createElement('p', { className: 'hs-guide' }, '本 GUI 日常用 v3；要短刻度结单切 astra。窗口小或模型弱用 flash。Opus / GPT-5 / Grok 4 等顶级英文模型才用 variant-b。'),
    ),
    React.createElement('div', { className: 'hs-switch' },
      React.createElement('div', { className: 'hs-switchBody' },
        React.createElement('div', { className: 'hs-switchTitle' }, state.enabled ? '牛来注入已开启' : '已恢复 DSH 默认'),
        React.createElement('div', { className: 'hs-switchMeta' }, state.enabled
          ? '当前会把选中的提示词注入系统提示。关闭后立即回到 Harness 原提示词，已保存的套仍保留。'
          : '牛来不再注入。重新打开开关，或启用任一内置/自定义套即可恢复。'),
      ),
      React.createElement('button', {
        type: 'button',
        className: 'hs-toggle',
        'data-on': String(state.enabled),
        'aria-pressed': String(state.enabled),
        'aria-label': state.enabled ? '关闭牛来注入' : '开启牛来注入',
        disabled: Boolean(busy),
        onClick: () => void run(
          'enable',
          () => api('/enable', { method: 'POST', body: JSON.stringify({ enabled: !state.enabled }) }),
          state.enabled ? '已恢复 DSH 默认系统提示词，牛来不再注入。' : '已重新开启牛来注入。',
          state.enabled ? 'dsh-default' : (state.storedId || state.activeId),
        ),
      }, React.createElement('span')),
    ),
    React.createElement('div', { className: 'hs-latch' },
      React.createElement('div', { className: 'hs-latchTitle' }, '听词探测'),
      React.createElement('div', { className: 'hs-latchMeta' }, '整句恰好等于听词时，所有套都只回同一行，并带上当前套 id。正文里的旧听词作废。'),
      React.createElement('div', { className: 'hs-latchPreview' }, state.enabled
        ? `用户说「${state.activationWord || '牛来'}」→ ${state.activationPreview || `${state.activationReply || '已成功'} · ${state.activeId}`}`
        : '当前未注入，听词不会触发。'),
      React.createElement('div', { className: 'hs-latchGrid' },
        React.createElement('div', null,
          React.createElement('div', { className: 'hs-label' }, '听词'),
          React.createElement('input', {
            className: 'hs-input',
            value: wordDraft,
            maxLength: 40,
            onChange: (event: React.ChangeEvent<HTMLInputElement>) => setWordDraft(event.target.value),
          }),
        ),
        React.createElement('div', null,
          React.createElement('div', { className: 'hs-label' }, '回复前缀'),
          React.createElement('input', {
            className: 'hs-input',
            value: replyDraft,
            maxLength: 40,
            onChange: (event: React.ChangeEvent<HTMLInputElement>) => setReplyDraft(event.target.value),
          }),
        ),
        React.createElement('button', {
          type: 'button',
          className: 'hs-btn',
          'data-kind': 'primary',
          disabled: Boolean(busy) || !wordDraft.trim() || !replyDraft.trim(),
          onClick: () => void run('activation', () => api('/activation', {
            method: 'POST',
            body: JSON.stringify({ word: wordDraft.trim(), reply: replyDraft.trim() }),
          }), '听词已更新，后续对话立即生效。'),
        }, busy === 'activation' ? '保存中…' : '保存听词'),
      ),
    ),
    notice ? React.createElement('div', { className: 'hs-banner', 'data-tone': notice.tone }, notice.text) : null,
    state.envPath && state.enabled ? React.createElement('div', { className: 'hs-banner' }, '检测到 NIULAI_PROMPT_PATH，当前实际注入来自该文件。关闭注入或清除该环境变量后才会改用设置页选择。') : null,
    React.createElement('ul', { className: 'hs-grid' },
      state.items.map((item) => React.createElement('li', { key: item.id },
        React.createElement('button', {
          type: 'button',
          className: 'hs-card',
          'data-active': String(item.id === selectedId),
          onClick: () => selectCard(item),
        },
          React.createElement('div', { className: 'hs-cardName' }, item.name),
          React.createElement('div', { className: 'hs-cardFit' }, fitLabel(item.id, item.kind)),
          React.createElement('div', { className: 'hs-cardMeta' }, item.description),
          React.createElement('div', { className: 'hs-tags' },
            React.createElement('span', { className: 'hs-tag' }, kindLabel(item.kind)),
            item.active ? React.createElement('span', { className: 'hs-tag', 'data-tone': 'on' }, '使用中') : null,
            item.overridden ? React.createElement('span', { className: 'hs-tag' }, '已改写') : null,
            item.kind !== 'default' ? React.createElement('span', { className: 'hs-tag' }, `${item.chars} 字`) : null,
          ),
        ),
      )),
    ),
    selected ? React.createElement('section', { className: 'hs-editor' },
      React.createElement('div', { className: 'hs-label' }, selected.kind === 'default' ? 'DSH 默认（不注入牛来）' : (readOnly ? '环境变量提示词（只读）' : '编辑当前提示词')),
      selected.kind === 'custom' ? React.createElement('input', {
        className: 'hs-input',
        value: draftName,
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => setDraftName(event.target.value),
        disabled: Boolean(busy) || readOnly,
      }) : null,
      selected.kind === 'default'
        ? React.createElement('div', { className: 'hs-banner' }, '不会写入牛来段落。Agent 只使用 DeepSeek Harness 自带的系统提示词。已保存的内置改写和自定义套都还在，随时可以再启用。')
        : React.createElement('textarea', {
          className: 'hs-area',
          value: draft,
          spellCheck: false,
          readOnly,
          onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => setDraft(event.target.value),
        }),
      React.createElement('div', { className: 'hs-row' },
        React.createElement('button', {
          type: 'button',
          className: 'hs-btn',
          'data-kind': 'primary',
          disabled: Boolean(busy) || selected.kind === 'env' || selected.active,
          onClick: () => void run('select', () => api('/select', {
            method: 'POST',
            body: JSON.stringify({ id: selected.id }),
          }), selected.kind === 'default'
            ? '已恢复 DSH 默认系统提示词，牛来不再注入。'
            : `已启用「${selected.name}」，后续对话立即生效。`, selected.id),
        }, selected.active
          ? (selected.kind === 'default' ? '当前为 DSH 默认' : '使用中')
          : (busy === 'select' ? '启用中…' : (selected.kind === 'default' ? '恢复默认' : '启用此套'))),
        React.createElement('button', {
          type: 'button',
          className: 'hs-btn',
          disabled: Boolean(busy) || readOnly || !dirty,
          onClick: () => void run('save', () => api('/save', {
            method: 'POST',
            body: JSON.stringify({ id: selected.id, text: draft, name: draftName }),
          }), '已保存。若当前正在使用此套，后续对话立即使用新文本。', selected.id),
        }, busy === 'save' ? '保存中…' : '保存修改'),
        selected.kind === 'builtin' && selected.overridden ? React.createElement('button', {
          type: 'button',
          className: 'hs-btn',
          disabled: Boolean(busy),
          onClick: () => void run('reset', () => api('/reset', { method: 'POST', body: JSON.stringify({ id: selected.id }) }), '已恢复内置原文。', selected.id),
        }, '恢复内置') : null,
        selected.kind === 'custom' ? React.createElement('button', {
          type: 'button',
          className: 'hs-btn',
          disabled: Boolean(busy),
          onClick: () => {
            if (!window.confirm(`删除自定义提示词「${selected.name}」？`)) return
            void run('delete', () => api('/delete', { method: 'POST', body: JSON.stringify({ id: selected.id }) }), '已删除。')
          },
        }, '删除') : null,
        React.createElement('span', { className: 'hs-spacer' }),
        React.createElement('span', { className: 'hs-status' }, dirty ? '未保存' : `配置：${state.configFile}`),
      ),
    ) : null,
    React.createElement('section', { className: 'hs-editor' },
      React.createElement('div', { className: 'hs-label' }, '导入自定义提示词'),
      React.createElement('input', {
        className: 'hs-input',
        placeholder: '名称，例如 我的牛来',
        value: importName,
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => setImportName(event.target.value),
      }),
      React.createElement('textarea', {
        className: 'hs-area',
        style: { minHeight: 140 },
        placeholder: '粘贴 markdown / 纯文本，或从文件导入',
        value: importText,
        spellCheck: false,
        onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => setImportText(event.target.value),
      }),
      React.createElement('div', { className: 'hs-row' },
        React.createElement('input', {
          ref: fileRef,
          className: 'hs-hidden',
          type: 'file',
          accept: '.md,.txt,text/markdown,text/plain',
          onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0]
            if (file) void onImportFile(file)
            event.target.value = ''
          },
        }),
        React.createElement('button', {
          type: 'button',
          className: 'hs-btn',
          onClick: () => fileRef.current?.click(),
        }, '从文件导入'),
        React.createElement('button', {
          type: 'button',
          className: 'hs-btn',
          'data-kind': 'primary',
          disabled: Boolean(busy) || !importName.trim() || !importText.trim(),
          onClick: () => void run('import', async () => {
            const next = await api<State>('/import', {
              method: 'POST',
              body: JSON.stringify({ name: importName.trim(), text: importText, activate: true }),
            })
            setImportName('')
            setImportText('')
            return next
          }, '已导入并启用自定义提示词。'),
        }, busy === 'import' ? '导入中…' : '导入并启用'),
      ),
    ),
  )
}

export function apply(ctx) {
  ctx.effect(() => ctx.slots.inject('settings.section', () => ctx.slots.register({
    name: 'settings.section',
    id: 'niulai',
    order: 25,
    label: '牛来',
  }, NiulaiSettings)))
}
