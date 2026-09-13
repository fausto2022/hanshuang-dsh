# dsh-hanshuang 插件计划

> 本插件由 DSH 插件开发助手（dsh-plugin-studio）在既有寒霜仓库上扩展。
> 每阶段决策确定后勾选对应项，未通过不得进入下一阶段。

## 阶段 ①：需求捕获

- [x] 插件名：`dsh-hanshuang`
- [x] 一句话目标：在 DSH Web 设置里选择、修改、导入寒霜系统提示词，并立即注入后续对话
- [x] 能力面清单：
- [x] 命令/工具（保留 `/hanshuang`）
- [x] HTTP 接口（`/dsh-hanshuang/*` 配置读写）
- [x] 设置面板（Settings → 寒霜）
- [x] 目标 profile：web

## 阶段 ②：形态与分发决策

- [x] 形态：`bundle-client`
- [x] 分发方式：git 源（默认）/ 本地目录
- [x] 包管理器：pnpm（默认）

## 阶段 ③：配方装配

- [x] `src/index.ts` 已生成（提示词解析、热更新注入、HTTP API、命令）
- [x] `src/client/index.ts` 已生成（settings.section 寒霜页）
- [x] `inject` 已覆盖所有服务（node 顶层: `systemPrompt`；`webServer` / `command` 用嵌套 `ctx.inject` 可选等待；client: `slots`）
- [x] 冒烟功能就绪（`/hanshuang` 有 command 时注册、`GET /dsh-hanshuang/health`、设置页「寒霜」）
- [x] 未手改 `lib/`（由 `pnpm run bundle` 生成）

## 阶段 ④：本地验证

- [x] `npm install --include=dev` 通过（环境 `NODE_ENV=production`，已加 `.npmrc production=false`）
- [x] `npm run bundle` 通过
- [x] `npm run gates` 通过
- [x] `python3 verify_plugin.py` 通过（11/11；`ctx.get` 已改回声明过的 `ctx.systemPrompt`）

## 阶段 ⑤：安装与浏览器冒烟

- [ ] 安装成功（`dsh plugin --profile web add ...`）
- [ ] 启动日志无 `plugin tree failed to load`
- [ ] 浏览器无 `slot entry crashed`
- [ ] 冒烟功能可用

## 阶段 ⑥：发布

- [x] git 仓库与 remote 就绪
- [ ] README 使用真实安装 ref
- [ ] 构建产物已入库
- [ ] 从目标 ref 重装验证通过

## 备注

- 在既有 `dsh-hanshuang` 仓库上扩展，而不是新建空项目。
- 设置页注册真实 slot `settings.section`（id=`hanshuang`），而不是过时的 `settings`。
- 配置仍写入 `~/.dsh/hanshuang.json`，与原 `/hanshuang set` 命令共用。
- 切换/保存后立即 `systemPrompt.section()` 重注册，后续对话生效，无需重启 web。
- 恢复默认：`enabled: false` 时 dispose 寒霜 section，不再注入；设置页顶部开关 +「DSH 默认」卡片 + `/hanshuang off`。
