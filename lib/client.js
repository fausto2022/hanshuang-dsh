window.__ModuleLoader__.load({ id: "dsh-niulai", factory: (require) => {
var module = { exports: {} }; var exports = module.exports;
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/index.ts
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  immediately: () => immediately,
  inject: () => inject
});
module.exports = __toCommonJS(index_exports);
var import_react = __toESM(require("react"), 1);
var inject = ["slots"];
var immediately = true;
var API = "/dsh-niulai";
var TAG_ID = "dsh-niulai/NiulaiSettings.module.css";
var CSS = `
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
`;
function ensureCss() {
  if (typeof document === "undefined") return;
  if (document.querySelector(`style[data-plugin-css=${JSON.stringify(TAG_ID)}]`)) return;
  const tag = document.createElement("style");
  tag.dataset.plugin = "dsh-niulai";
  tag.dataset.pluginCss = TAG_ID;
  tag.textContent = CSS;
  document.head.appendChild(tag);
}
async function api(path, init) {
  const res = await fetch(`${API}${path}`, {
    credentials: "same-origin",
    headers: { Accept: "application/json", ...init?.body ? { "Content-Type": "application/json" } : {} },
    ...init
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data?.ok === false) throw new Error(data?.error || `\u8BF7\u6C42\u5931\u8D25 (${res.status})`);
  return data;
}
function kindLabel(kind) {
  if (kind === "builtin") return "\u5185\u7F6E";
  if (kind === "custom") return "\u81EA\u5B9A\u4E49";
  if (kind === "default") return "\u9ED8\u8BA4";
  return "\u73AF\u5883\u53D8\u91CF";
}
function fitLabel(id, kind) {
  if (id === "v3") return "\u63A8\u8350 \xB7 DeepSeek / Qwen / Sonnet";
  if (id === "flash") return "\u4E2D\u7AEF \xB7 Flash / Haiku / mini";
  if (id === "variant-b") return "\u9876\u7EA7\u82F1\u6587 \xB7 Opus / GPT-5 / Grok 4";
  if (id === "astra") return "\u601D\u8003\u5E2D \xB7 DeepSeek reasoner";
  if (kind === "default") return "\u5173\u95ED\u6CE8\u5165";
  if (kind === "env") return "\u73AF\u5883\u53D8\u91CF\u4F18\u5148";
  return "\u81EA\u5B9A\u4E49\u5957";
}
function NiulaiSettings() {
  const [state, setState] = (0, import_react.useState)(null);
  const [selectedId, setSelectedId] = (0, import_react.useState)("");
  const [draft, setDraft] = (0, import_react.useState)("");
  const [draftName, setDraftName] = (0, import_react.useState)("");
  const [importName, setImportName] = (0, import_react.useState)("");
  const [importText, setImportText] = (0, import_react.useState)("");
  const [wordDraft, setWordDraft] = (0, import_react.useState)("\u725B\u6765");
  const [replyDraft, setReplyDraft] = (0, import_react.useState)("\u5DF2\u6210\u529F");
  const [busy, setBusy] = (0, import_react.useState)("");
  const [notice, setNotice] = (0, import_react.useState)(null);
  const fileRef = (0, import_react.useRef)(null);
  const selectedIdRef = (0, import_react.useRef)("");
  selectedIdRef.current = selectedId;
  const applyState = (0, import_react.useCallback)((next, preferId) => {
    setState(next);
    const want = preferId || selectedIdRef.current || next.activeId;
    const current = next.items.find((item) => item.id === want) ?? next.items.find((item) => item.id === next.activeId) ?? next.items[0];
    if (!current) return;
    setSelectedId(current.id);
    setDraft(current.text);
    setDraftName(current.name);
    setWordDraft(next.activationWord || "\u725B\u6765");
    setReplyDraft(next.activationReply || "\u5DF2\u6210\u529F");
  }, []);
  const load = (0, import_react.useCallback)(async () => {
    setBusy("load");
    try {
      const next = await api("/state");
      applyState(next, next.activeId);
      setNotice(null);
    } catch (error) {
      setNotice({ tone: "err", text: error instanceof Error ? error.message : String(error) });
    } finally {
      setBusy("");
    }
  }, [applyState]);
  (0, import_react.useEffect)(() => {
    ensureCss();
    void load();
  }, [load]);
  const selected = (0, import_react.useMemo)(
    () => state?.items.find((item) => item.id === selectedId) ?? null,
    [state, selectedId]
  );
  const dirty = Boolean(selected && selected.kind !== "default" && (draft !== selected.text || selected.kind === "custom" && draftName !== selected.name));
  const readOnly = selected?.kind === "env" || selected?.kind === "default";
  const run = async (key, work, okText, preferId) => {
    setBusy(key);
    try {
      const next = await work();
      applyState(next, preferId ?? next.importedId);
      setNotice({ tone: "ok", text: okText });
    } catch (error) {
      setNotice({ tone: "err", text: error instanceof Error ? error.message : String(error) });
    } finally {
      setBusy("");
    }
  };
  const selectCard = (item) => {
    if (item.id === selectedId) return;
    if (dirty && !window.confirm("\u5F53\u524D\u7F16\u8F91\u5C1A\u672A\u4FDD\u5B58\uFF0C\u5207\u6362\u540E\u4F1A\u4E22\u5931\u3002\u7EE7\u7EED\uFF1F")) return;
    setSelectedId(item.id);
    setDraft(item.text);
    setDraftName(item.name);
  };
  const onImportFile = async (file) => {
    const text = await file.text();
    setImportText(text);
    if (!importName.trim()) setImportName(file.name.replace(/\.(md|txt)$/i, ""));
  };
  if (!state) {
    return import_react.default.createElement(
      "div",
      { className: "hs-root" },
      import_react.default.createElement("p", { className: "hs-status" }, busy ? "\u6B63\u5728\u8BFB\u53D6\u725B\u6765\u914D\u7F6E\u2026" : notice?.text ?? "\u672A\u80FD\u8BFB\u53D6\u914D\u7F6E"),
      notice?.tone === "err" ? import_react.default.createElement("button", { className: "hs-btn", type: "button", onClick: () => void load() }, "\u91CD\u8BD5") : null
    );
  }
  return import_react.default.createElement(
    "div",
    { className: "hs-root" },
    import_react.default.createElement(
      "header",
      { className: "hs-head" },
      import_react.default.createElement("div", { className: "hs-kicker" }, "NIULAI"),
      import_react.default.createElement("h2", { className: "hs-title" }, "\u725B\u6765\u63D0\u793A\u8BCD"),
      import_react.default.createElement("p", { className: "hs-lead" }, "\u9009\u62E9\u6CE8\u5165 Agent \u7684\u7CFB\u7EDF\u63D0\u793A\u8BCD\u3002\u4E0D\u60F3\u7528\u65F6\u6062\u590D DSH \u9ED8\u8BA4\uFF0C\u540E\u7EED\u5BF9\u8BDD\u7ACB\u5373\u4E0D\u518D\u6CE8\u5165\u725B\u6765\u3002"),
      import_react.default.createElement("p", { className: "hs-guide" }, "\u672C GUI \u65E5\u5E38\u7528 v3\uFF1B\u8981\u77ED\u523B\u5EA6\u7ED3\u5355\u5207 astra\u3002\u7A97\u53E3\u5C0F\u6216\u6A21\u578B\u5F31\u7528 flash\u3002Opus / GPT-5 / Grok 4 \u7B49\u9876\u7EA7\u82F1\u6587\u6A21\u578B\u624D\u7528 variant-b\u3002")
    ),
    import_react.default.createElement(
      "div",
      { className: "hs-switch" },
      import_react.default.createElement(
        "div",
        { className: "hs-switchBody" },
        import_react.default.createElement("div", { className: "hs-switchTitle" }, state.enabled ? "\u725B\u6765\u6CE8\u5165\u5DF2\u5F00\u542F" : "\u5DF2\u6062\u590D DSH \u9ED8\u8BA4"),
        import_react.default.createElement("div", { className: "hs-switchMeta" }, state.enabled ? "\u5F53\u524D\u4F1A\u628A\u9009\u4E2D\u7684\u63D0\u793A\u8BCD\u6CE8\u5165\u7CFB\u7EDF\u63D0\u793A\u3002\u5173\u95ED\u540E\u7ACB\u5373\u56DE\u5230 Harness \u539F\u63D0\u793A\u8BCD\uFF0C\u5DF2\u4FDD\u5B58\u7684\u5957\u4ECD\u4FDD\u7559\u3002" : "\u725B\u6765\u4E0D\u518D\u6CE8\u5165\u3002\u91CD\u65B0\u6253\u5F00\u5F00\u5173\uFF0C\u6216\u542F\u7528\u4EFB\u4E00\u5185\u7F6E/\u81EA\u5B9A\u4E49\u5957\u5373\u53EF\u6062\u590D\u3002")
      ),
      import_react.default.createElement("button", {
        type: "button",
        className: "hs-toggle",
        "data-on": String(state.enabled),
        "aria-pressed": String(state.enabled),
        "aria-label": state.enabled ? "\u5173\u95ED\u725B\u6765\u6CE8\u5165" : "\u5F00\u542F\u725B\u6765\u6CE8\u5165",
        disabled: Boolean(busy),
        onClick: () => void run(
          "enable",
          () => api("/enable", { method: "POST", body: JSON.stringify({ enabled: !state.enabled }) }),
          state.enabled ? "\u5DF2\u6062\u590D DSH \u9ED8\u8BA4\u7CFB\u7EDF\u63D0\u793A\u8BCD\uFF0C\u725B\u6765\u4E0D\u518D\u6CE8\u5165\u3002" : "\u5DF2\u91CD\u65B0\u5F00\u542F\u725B\u6765\u6CE8\u5165\u3002",
          state.enabled ? "dsh-default" : state.storedId || state.activeId
        )
      }, import_react.default.createElement("span"))
    ),
    import_react.default.createElement(
      "div",
      { className: "hs-latch" },
      import_react.default.createElement("div", { className: "hs-latchTitle" }, "\u542C\u8BCD\u63A2\u6D4B"),
      import_react.default.createElement("div", { className: "hs-latchMeta" }, "\u6574\u53E5\u6070\u597D\u7B49\u4E8E\u542C\u8BCD\u65F6\uFF0C\u6240\u6709\u5957\u90FD\u53EA\u56DE\u540C\u4E00\u884C\uFF0C\u5E76\u5E26\u4E0A\u5F53\u524D\u5957 id\u3002\u6B63\u6587\u91CC\u7684\u65E7\u542C\u8BCD\u4F5C\u5E9F\u3002"),
      import_react.default.createElement("div", { className: "hs-latchPreview" }, state.enabled ? `\u7528\u6237\u8BF4\u300C${state.activationWord || "\u725B\u6765"}\u300D\u2192 ${state.activationPreview || `${state.activationReply || "\u5DF2\u6210\u529F"} \xB7 ${state.activeId}`}` : "\u5F53\u524D\u672A\u6CE8\u5165\uFF0C\u542C\u8BCD\u4E0D\u4F1A\u89E6\u53D1\u3002"),
      import_react.default.createElement(
        "div",
        { className: "hs-latchGrid" },
        import_react.default.createElement(
          "div",
          null,
          import_react.default.createElement("div", { className: "hs-label" }, "\u542C\u8BCD"),
          import_react.default.createElement("input", {
            className: "hs-input",
            value: wordDraft,
            maxLength: 40,
            onChange: (event) => setWordDraft(event.target.value)
          })
        ),
        import_react.default.createElement(
          "div",
          null,
          import_react.default.createElement("div", { className: "hs-label" }, "\u56DE\u590D\u524D\u7F00"),
          import_react.default.createElement("input", {
            className: "hs-input",
            value: replyDraft,
            maxLength: 40,
            onChange: (event) => setReplyDraft(event.target.value)
          })
        ),
        import_react.default.createElement("button", {
          type: "button",
          className: "hs-btn",
          "data-kind": "primary",
          disabled: Boolean(busy) || !wordDraft.trim() || !replyDraft.trim(),
          onClick: () => void run("activation", () => api("/activation", {
            method: "POST",
            body: JSON.stringify({ word: wordDraft.trim(), reply: replyDraft.trim() })
          }), "\u542C\u8BCD\u5DF2\u66F4\u65B0\uFF0C\u540E\u7EED\u5BF9\u8BDD\u7ACB\u5373\u751F\u6548\u3002")
        }, busy === "activation" ? "\u4FDD\u5B58\u4E2D\u2026" : "\u4FDD\u5B58\u542C\u8BCD")
      )
    ),
    notice ? import_react.default.createElement("div", { className: "hs-banner", "data-tone": notice.tone }, notice.text) : null,
    state.envPath && state.enabled ? import_react.default.createElement("div", { className: "hs-banner" }, "\u68C0\u6D4B\u5230 NIULAI_PROMPT_PATH\uFF0C\u5F53\u524D\u5B9E\u9645\u6CE8\u5165\u6765\u81EA\u8BE5\u6587\u4EF6\u3002\u5173\u95ED\u6CE8\u5165\u6216\u6E05\u9664\u8BE5\u73AF\u5883\u53D8\u91CF\u540E\u624D\u4F1A\u6539\u7528\u8BBE\u7F6E\u9875\u9009\u62E9\u3002") : null,
    import_react.default.createElement(
      "ul",
      { className: "hs-grid" },
      state.items.map((item) => import_react.default.createElement(
        "li",
        { key: item.id },
        import_react.default.createElement(
          "button",
          {
            type: "button",
            className: "hs-card",
            "data-active": String(item.id === selectedId),
            onClick: () => selectCard(item)
          },
          import_react.default.createElement("div", { className: "hs-cardName" }, item.name),
          import_react.default.createElement("div", { className: "hs-cardFit" }, fitLabel(item.id, item.kind)),
          import_react.default.createElement("div", { className: "hs-cardMeta" }, item.description),
          import_react.default.createElement(
            "div",
            { className: "hs-tags" },
            import_react.default.createElement("span", { className: "hs-tag" }, kindLabel(item.kind)),
            item.active ? import_react.default.createElement("span", { className: "hs-tag", "data-tone": "on" }, "\u4F7F\u7528\u4E2D") : null,
            item.overridden ? import_react.default.createElement("span", { className: "hs-tag" }, "\u5DF2\u6539\u5199") : null,
            item.kind !== "default" ? import_react.default.createElement("span", { className: "hs-tag" }, `${item.chars} \u5B57`) : null
          )
        )
      ))
    ),
    selected ? import_react.default.createElement(
      "section",
      { className: "hs-editor" },
      import_react.default.createElement("div", { className: "hs-label" }, selected.kind === "default" ? "DSH \u9ED8\u8BA4\uFF08\u4E0D\u6CE8\u5165\u725B\u6765\uFF09" : readOnly ? "\u73AF\u5883\u53D8\u91CF\u63D0\u793A\u8BCD\uFF08\u53EA\u8BFB\uFF09" : "\u7F16\u8F91\u5F53\u524D\u63D0\u793A\u8BCD"),
      selected.kind === "custom" ? import_react.default.createElement("input", {
        className: "hs-input",
        value: draftName,
        onChange: (event) => setDraftName(event.target.value),
        disabled: Boolean(busy) || readOnly
      }) : null,
      selected.kind === "default" ? import_react.default.createElement("div", { className: "hs-banner" }, "\u4E0D\u4F1A\u5199\u5165\u725B\u6765\u6BB5\u843D\u3002Agent \u53EA\u4F7F\u7528 DeepSeek Harness \u81EA\u5E26\u7684\u7CFB\u7EDF\u63D0\u793A\u8BCD\u3002\u5DF2\u4FDD\u5B58\u7684\u5185\u7F6E\u6539\u5199\u548C\u81EA\u5B9A\u4E49\u5957\u90FD\u8FD8\u5728\uFF0C\u968F\u65F6\u53EF\u4EE5\u518D\u542F\u7528\u3002") : import_react.default.createElement("textarea", {
        className: "hs-area",
        value: draft,
        spellCheck: false,
        readOnly,
        onChange: (event) => setDraft(event.target.value)
      }),
      import_react.default.createElement(
        "div",
        { className: "hs-row" },
        import_react.default.createElement("button", {
          type: "button",
          className: "hs-btn",
          "data-kind": "primary",
          disabled: Boolean(busy) || selected.kind === "env" || selected.active,
          onClick: () => void run("select", () => api("/select", {
            method: "POST",
            body: JSON.stringify({ id: selected.id })
          }), selected.kind === "default" ? "\u5DF2\u6062\u590D DSH \u9ED8\u8BA4\u7CFB\u7EDF\u63D0\u793A\u8BCD\uFF0C\u725B\u6765\u4E0D\u518D\u6CE8\u5165\u3002" : `\u5DF2\u542F\u7528\u300C${selected.name}\u300D\uFF0C\u540E\u7EED\u5BF9\u8BDD\u7ACB\u5373\u751F\u6548\u3002`, selected.id)
        }, selected.active ? selected.kind === "default" ? "\u5F53\u524D\u4E3A DSH \u9ED8\u8BA4" : "\u4F7F\u7528\u4E2D" : busy === "select" ? "\u542F\u7528\u4E2D\u2026" : selected.kind === "default" ? "\u6062\u590D\u9ED8\u8BA4" : "\u542F\u7528\u6B64\u5957"),
        import_react.default.createElement("button", {
          type: "button",
          className: "hs-btn",
          disabled: Boolean(busy) || readOnly || !dirty,
          onClick: () => void run("save", () => api("/save", {
            method: "POST",
            body: JSON.stringify({ id: selected.id, text: draft, name: draftName })
          }), "\u5DF2\u4FDD\u5B58\u3002\u82E5\u5F53\u524D\u6B63\u5728\u4F7F\u7528\u6B64\u5957\uFF0C\u540E\u7EED\u5BF9\u8BDD\u7ACB\u5373\u4F7F\u7528\u65B0\u6587\u672C\u3002", selected.id)
        }, busy === "save" ? "\u4FDD\u5B58\u4E2D\u2026" : "\u4FDD\u5B58\u4FEE\u6539"),
        selected.kind === "builtin" && selected.overridden ? import_react.default.createElement("button", {
          type: "button",
          className: "hs-btn",
          disabled: Boolean(busy),
          onClick: () => void run("reset", () => api("/reset", { method: "POST", body: JSON.stringify({ id: selected.id }) }), "\u5DF2\u6062\u590D\u5185\u7F6E\u539F\u6587\u3002", selected.id)
        }, "\u6062\u590D\u5185\u7F6E") : null,
        selected.kind === "custom" ? import_react.default.createElement("button", {
          type: "button",
          className: "hs-btn",
          disabled: Boolean(busy),
          onClick: () => {
            if (!window.confirm(`\u5220\u9664\u81EA\u5B9A\u4E49\u63D0\u793A\u8BCD\u300C${selected.name}\u300D\uFF1F`)) return;
            void run("delete", () => api("/delete", { method: "POST", body: JSON.stringify({ id: selected.id }) }), "\u5DF2\u5220\u9664\u3002");
          }
        }, "\u5220\u9664") : null,
        import_react.default.createElement("span", { className: "hs-spacer" }),
        import_react.default.createElement("span", { className: "hs-status" }, dirty ? "\u672A\u4FDD\u5B58" : `\u914D\u7F6E\uFF1A${state.configFile}`)
      )
    ) : null,
    import_react.default.createElement(
      "section",
      { className: "hs-editor" },
      import_react.default.createElement("div", { className: "hs-label" }, "\u5BFC\u5165\u81EA\u5B9A\u4E49\u63D0\u793A\u8BCD"),
      import_react.default.createElement("input", {
        className: "hs-input",
        placeholder: "\u540D\u79F0\uFF0C\u4F8B\u5982 \u6211\u7684\u725B\u6765",
        value: importName,
        onChange: (event) => setImportName(event.target.value)
      }),
      import_react.default.createElement("textarea", {
        className: "hs-area",
        style: { minHeight: 140 },
        placeholder: "\u7C98\u8D34 markdown / \u7EAF\u6587\u672C\uFF0C\u6216\u4ECE\u6587\u4EF6\u5BFC\u5165",
        value: importText,
        spellCheck: false,
        onChange: (event) => setImportText(event.target.value)
      }),
      import_react.default.createElement(
        "div",
        { className: "hs-row" },
        import_react.default.createElement("input", {
          ref: fileRef,
          className: "hs-hidden",
          type: "file",
          accept: ".md,.txt,text/markdown,text/plain",
          onChange: (event) => {
            const file = event.target.files?.[0];
            if (file) void onImportFile(file);
            event.target.value = "";
          }
        }),
        import_react.default.createElement("button", {
          type: "button",
          className: "hs-btn",
          onClick: () => fileRef.current?.click()
        }, "\u4ECE\u6587\u4EF6\u5BFC\u5165"),
        import_react.default.createElement("button", {
          type: "button",
          className: "hs-btn",
          "data-kind": "primary",
          disabled: Boolean(busy) || !importName.trim() || !importText.trim(),
          onClick: () => void run("import", async () => {
            const next = await api("/import", {
              method: "POST",
              body: JSON.stringify({ name: importName.trim(), text: importText, activate: true })
            });
            setImportName("");
            setImportText("");
            return next;
          }, "\u5DF2\u5BFC\u5165\u5E76\u542F\u7528\u81EA\u5B9A\u4E49\u63D0\u793A\u8BCD\u3002")
        }, busy === "import" ? "\u5BFC\u5165\u4E2D\u2026" : "\u5BFC\u5165\u5E76\u542F\u7528")
      )
    )
  );
}
function apply(ctx) {
  ctx.effect(() => ctx.slots.inject("settings.section", () => ctx.slots.register({
    name: "settings.section",
    id: "niulai",
    order: 25,
    label: "\u725B\u6765"
  }, NiulaiSettings)));
}
return module.exports; } });
