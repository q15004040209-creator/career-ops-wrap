# Career-Ops Wrapper · 求职系统封装

> ⚡ 将 AI 驱动求职系统快速封装为可复用模块，支持 14 种技能模式、Go 仪表盘、PDF 生成与批量处理

[English](#english) · [中文](#中文)

---

## 中文说明

### 项目简介

**Career-Ops Wrapper** 是 [career-ops](https://github.com/santifer/career-ops) 的模块化封装版本，将 AI 驱动求职系统的核心能力抽离为可独立引用的组件。项目保留原系统全部功能的同时，提供更清晰的接口契约，方便集成到各类 AI Coding CLI 环境中。

### 核心功能

| 功能模块 | 说明 |
|---------|------|
| 🏷️ **14 种技能模式** | LLMOps / Agentic / PM / SA / FDE / Transformation 等 archetypes 智能分类 |
| 📊 **Go 仪表盘 TUI** | 终端 UI 浏览、筛选、排序求职 Pipeline，支持 6 种过滤标签 |
| 📄 **ATS 优化 PDF** | 基于关键词注入的简历生成，Space Grotesk + DM Sans 设计 |
| 🔍 **Portal 扫描器** | 45+ 公司预配置（Anthropic、OpenAI、ElevenLabs 等）+ 自定义查询 |
| ⚡ **批量处理** | 并行评估 10+ Offer，claude -p workers 子代理支持 |
| 📈 **A-F 评分系统** | 10 维加权评估，从匹配度、薪资、成长多角度打分 |
| 📝 **面试故事库** | 积累 STAR+Reflection 故事，应对任意行为面试问题 |
| 💰 **谈判脚本** | 薪资谈判框架、地区差异议价、竞争 Offer 杠杆话术 |

### 技术栈

- **AI 引擎**: Claude Code / Gemini CLI / OpenCode 通用
- **TUI 仪表盘**: Go + Bubble Tea
- **PDF 生成**: Playwright + 自定义 HTML 模板
- **数据追踪**: TSV 文件 + 自动化去重与完整性校验
- **扫描器**: 支持 Ashby / Greenhouse / Lever / Wellfound / RemoteFront

### 快速开始

```bash
# 克隆封装版本
git clone https://github.com/q15004040209-creator/career-ops-wrap.git
cd career-ops-wrap

# 安装依赖
npm install
npx playwright install chromium

# 运行诊断
npm run doctor

# 启动 Go 仪表盘
cd dashboard && go build -o career-dashboard . && ./career-dashboard --path ..
```

### 目录结构

```
career-ops-wrap/
├── examples/          # 示例 CV、评估报告
├── docs/              # 架构文档、安装指南
├── src/               # 封装核心模块
│   ├── evaluator.js   # A-F 评估引擎
│   ├── pdf-gen.js     # PDF 生成器
│   ├── scanner.js      # Portal 扫描器
│   ├── batch.js       # 批量处理器
│   └── dashboard/     # Go TUI 源码
├── modes/             # 14 种技能模式定义
└── templates/          # CV 模板 & Portal 配置
```

### 星星统计

![Stars](https://img.shields.io/github/stars/santifer/career-ops?style=flat)
![This Week](https://img.shields.io/github/commit-activity/t/santifer/career-ops/7d?style=flat)

> 数据来源：[career-ops](https://github.com/santifer/career-ops) · 48,987 ⭐ · 本周 +186

---

## English

### What is Career-Ops Wrapper?

A modular wrapper around [career-ops](https://github.com/santifer/career-ops) — the AI-powered job search command center built on Claude Code. This package exposes the same capabilities in a clean, reusable structure for easier integration across AI coding environments.

### Key Features

| Feature | Description |
|---------|-------------|
| 🏷️ **14 Skill Modes** | Intelligent archetype classification: LLMOps / Agentic / PM / SA / FDE / Transformation |
| 📊 **Go Dashboard TUI** | Terminal UI to browse, filter, sort your job pipeline with 6 filter tabs |
| 📄 **ATS PDF Generation** | Keyword-injected CV generation with Space Grotesk + DM Sans typography |
| 🔍 **Portal Scanner** | 45+ pre-configured companies (Anthropic, OpenAI, ElevenLabs...) + custom queries |
| ⚡ **Batch Processing** | Evaluate 10+ offers in parallel via claude -p worker sub-agents |
| 📈 **A-F Scoring System** | 10 weighted dimensions: match, gaps, comp research, STAR stories |
| 📝 **Interview Story Bank** | Accumulated STAR+Reflection stories for any behavioral question |
| 💰 **Negotiation Scripts** | Salary frameworks, geo discount pushback, competing offer leverage |

### Tech Stack

- **AI Engine**: Claude Code / Gemini CLI / OpenCode compatible
- **TUI Dashboard**: Go + Bubble Tea
- **PDF Generation**: Playwright + custom HTML templates
- **Data Tracking**: TSV files with automated dedup and integrity checks
- **Scanner**: Ashby / Greenhouse / Lever / Wellfound / RemoteFront support

### Quick Start

```bash
# Clone the wrapper
git clone https://github.com/q15004040209-creator/career-ops-wrap.git
cd career-ops-wrap

# Install dependencies
npm install
npx playwright install chromium

# Run doctor check
npm run doctor

# Start Go dashboard
cd dashboard && go build -o career-dashboard . && ./career-dashboard --path ..
```

### Project Structure

```
career-ops-wrap/
├── examples/          # Sample CV, evaluation report
├── docs/              # Architecture & setup docs
├── src/               # Core wrapped modules
│   ├── evaluator.js   # A-F evaluation engine
│   ├── pdf-gen.js     # PDF generator
│   ├── scanner.js     # Portal scanner
│   ├── batch.js       # Batch processor
│   └── dashboard/     # Go TUI source
├── modes/             # 14 skill mode definitions
└── templates/         # CV templates & portal config
```

### Star History

![Stars](https://img.shields.io/github/stars/santifer/career-ops?style=flat)
![Weekly Stars](https://img.shields.io/github/commit-activity/t/santifer/career-ops/7d?style=flat)

> Sourced from [career-ops](https://github.com/santifer/career-ops) · 48,987 ⭐ · +186 this week

---

## Star History · 星标历史

<a href="https://star-history.com/#santifer/career-ops&Date">
<img src="https://api.star-history.com/svg?repos=santifer/career-ops&type=Date" width="420" alt="Star History"/>
</a>

---

## License · 许可证

MIT License · Part of the [career-ops](https://github.com/santifer/career-ops) ecosystem
