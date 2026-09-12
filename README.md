# 寒霜 DSH 插件 (dsh-hanshuang)

DeepSeek Harness (DSH) 系统提示词注入插件。将寒霜工程规范自动注入到 DSH agent 的每轮对话中，使 agent 按寒霜工作规范运行。

## 快速开始

### 安装

`ash
# 从本地目录安装
dsh plugin add ./hanshuang-dsh

# 或通过 npm 安装（发布后）
dsh plugin add dsh-hanshuang
`

### 验证

在 DSH 对话中输入激活词：

`
寒霜
`

Agent 应回复：

`
已成功破甲
`

## 配置

在 DSH 配置中可自定义插件参数：

`yaml
# ~/.dsh/config.yaml 或项目级 .dsh/config.yaml
plugins:
  dsh-hanshuang:
    promptVariant: v3          # v3 | flash | variant-b
    activationWord: 寒霜       # 自定义激活词
    activationResponse: 已成功破甲
`

## 提示词变体

| 变体 | 文件 | 适用模型 | 语言 |
|------|------|----------|------|
| 3（默认） | prompts/hanshuang-v3.md | 中高端模型 | 中英混合 |
| lash | prompts/hanshuang-flash.md | 中端模型 | 中文 |
| ariant-b | prompts/hanshuang-variant-b.md | 顶级模型 | 英文 |

## 工作原理

1. DSH 启动时加载所有插件
2. 本插件通过 ctx.systemPrompt.section() 将寒霜指令集注入系统提示词
3. 指令集在每轮对话中始终生效（排在系统提示词最前面，优先级最高）
4. 插件无客户端 UI，纯服务端运行，对用户透明

## 目录结构

`
hanshuang-dsh/
├── package.json              # npm 包声明 + DSH bundle 配置
├── cordis.patch.yml          # DSH 插件树插入声明
├── tsconfig.json             # TypeScript 编译配置
├── src/
│   └── index.ts              # 插件主入口
├── prompts/
│   ├── hanshuang-v3.md       # v3 指令集（默认）
│   ├── hanshuang-flash.md    # flash 指令集
│   └── hanshuang-variant-b.md # 变体B 英文指令集
├── lib/                      # 编译产物（npm run build）
├── README.md
└── LICENSE
`

## 开发者

### 本地开发

`ash
# 安装依赖
npm install

# 编译 TypeScript
npm run build

# 在 DSH 中测试（从本地目录加载）
dsh plugin add ./hanshuang-dsh --dev
`

### 发布

`ash
npm run build
npm publish
`

## License

MIT — 见项目根目录 LICENSE 文件
