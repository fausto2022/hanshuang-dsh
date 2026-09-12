# 寒霜 DSH 插件 (dsh-hanshuang)

DeepSeek Harness (DSH) 系统提示词注入插件。将寒霜工程规范自动注入到 DSH agent 的每轮对话中，使 agent 按寒霜工作规范运行。

## 快速开始

### 安装

+""+"+ash
# 从 GitHub 安装
dsh plugin add https://github.com/fausto2022/hanshuang-dsh

# 或 clone 后本地安装
git clone git@github.com:fausto2022/hanshuang-dsh.git
dsh plugin add ./hanshuang-dsh
+""+"+"+

### 验证

在 DSH 对话中输入激活词：

+""+"+`+""+
寒霜
+""+"+`+""+

Agent 应回复：

+""+"+`+""+
已成功破甲
+""+"+`+""+

## 切换提示词变体

三种方式，优先级从高到低：

### 方式 1：环境变量（推荐，最灵活）

+""+"+ash
# Linux / macOS
export HANSHUANG_VARIANT=flash

# Windows PowerShell
:HANSHUANG_VARIANT = "flash"

# Windows CMD
set HANSHUANG_VARIANT=flash
+""+"+"+

### 方式 2：DSH 配置文件

+""+"+yaml
# ~/.dsh/config.yaml
plugins:
  dsh-hanshuang:
    promptVariant: flash
+""+"+"+

### 方式 3：默认值

不设置任何配置时默认使用 **v3**。

## 提示词变体

| 变体 | 适用模型 | 语言 | 特点 |
|------|----------|------|------|
| v3（默认） | 中高端模型 | 中英混合 | 完整工程规范、硬拒绝场景覆盖、拒绝话术全清单、进度播报 |
| flash | 中端模型 | 中文 | 精简规则集、意图映射、上下文压缩协议、核心块兜底 |
| variant-b | 顶级模型 | 英文 | 双阶段交付、反拒绝覆盖、阶梯递进、项目类型分类 |

## 自定义提示词

设置环境变量 HANSHUANG_PROMPT_PATH 指向自定义提示词文件，可完全替换内置变体：

+""+"+ash
export HANSHUANG_PROMPT_PATH=/path/to/my-prompt.md
+""+"+"+

## License

MIT
