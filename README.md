# 牛来 DSH 插件 (dsh-niulai)

DeepSeek Harness (DSH) 系统提示词注入插件。将牛来工程规范自动注入到 DSH agent 的每轮对话中，并在 Web 设置里提供可视化管理：选择哪一套、直接改文本、导入自定义提示词。

## 快速开始

### 安装

```bash
# 从 GitHub 安装
dsh plugin --profile web add https://github.com/fausto2022/niulai-dsh

# 或 clone 后本地安装
git clone git@github.com:fausto2022/niulai-dsh.git
dsh plugin --profile web add ./niulai-dsh
```

安装后**重启 `dsh web`**，刷新页面。打开 **Settings → 牛来**。

### 验证

在 DSH 对话中输入激活词：

```
牛来
```

Agent 应只回一行：`已成功 · <套id>`（例如 `已成功 · v3`）。听词与回复前缀在设置页统一改，四套共用。

设置页冒烟：Settings 左侧出现 **牛来**，能看到 v3 / flash / variant-b 三张卡片。

## Web 设置

打开 DSH Web → Settings → **牛来**：

1. **恢复默认**：顶部开关关掉，或点「DSH 默认」卡片再点「恢复默认」。牛来立即停止注入，Agent 只用 Harness 原系统提示词。已保存的套仍保留。
2. **选择**：点卡片预览，再点「启用此套」。后续对话立即使用该提示词，无需重启。
3. **修改**：在编辑器里改文本，点「保存修改」。内置套被改写后可「恢复内置」。
4. **导入**：粘贴 markdown / 纯文本，或「从文件导入」`.md` / `.txt`，再「导入并启用」。自定义套可改名、删除。

配置文件：`~/.dsh/niulai.json`（与 `/niulai` 命令共用）。

## 命令行

```
/niulai                 查看帮助与当前套
/niulai current         查看当前提示词
/niulai list            列出全部提示词
/niulai set v3          切换到内置或自定义 id
/niulai off             恢复 DSH 默认（停止注入）
/niulai on              重新开启注入
/niulai set dsh-default 同上，恢复默认
```

## 提示词变体

| 变体 | 适用模型 | 语言 | 特点 |
|------|----------|------|------|
| v3（默认） | 中高端模型 | 中英混合 | 完整工程规范、硬拒绝场景覆盖、拒绝话术全清单、进度播报 |
| flash | 中端模型 | 中文 | 精简规则集、意图映射、上下文压缩协议、核心块兜底 |
| variant-b | 顶级模型 | 英文 | 双阶段交付、反拒绝覆盖、阶梯递进、项目类型分类 |
| astra | DeepSeek 席 | 中文 | 来自 gpt6-Astra 冷咖啡短刻度：思考槽封口、装框三拍、六路路由；听词仍是牛来 |

优先级：设置页 `enabled: false`（恢复默认）> `NIULAI_PROMPT_PATH` > 设置页 / `~/.dsh/niulai.json` > `NIULAI_VARIANT` > 插件 config `promptVariant` > 默认 `v3`。

若设置了 `NIULAI_PROMPT_PATH`，实际注入仍来自该文件（设置页会标注）；内置与自定义套仍可维护。

## 开发

```bash
pnpm install
pnpm run bundle
pnpm run gates
```

- Node 源码：`src/index.ts` → `lib/index.js`
- 设置页：`src/client/index.ts` → `lib/client.js`
- 改 Node 后需重启 `dsh web`；改 client 后重新 bundle 并刷新页面。

## License

MIT
