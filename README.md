# 定制雕塑海外官网

楠轩雕塑面向欧美、中亚、印度和港澳台的玻璃钢与不锈钢定制雕塑展示及询盘网站。先交付英文版，再推进繁体中文与阿拉伯语。视觉尽量贴近参考站，企业资料与图片使用业主自有内容，缺失项先占位。英文品牌名未定，域名与服务器尚未购买。

当前阶段：P1 英文占位预览版，v0.2，2026-11-03（Asia/Shanghai）。已实现并完成本地构建、路由、响应式及主要键盘交互检查。尚未购买资源或公网部署。仓库名 ShoppingWeb 不代表购物商城需求。

## 本地启动

使用 Node **24.22.1**（见 `.node-version`）与 pnpm **11.25.0**。若没有 pnpm，先从官方发行渠道安装该版本；不要混用 npm／yarn 生成另一份锁文件。

```powershell
Set-Location D:\MyWorkfile\ShoppingWeb
pnpm install --frozen-lockfile
pnpm check
pnpm build
pnpm preview
```

打开 [英文预览](http://127.0.0.1:4321/en/)。保持终端运行，按 Ctrl+C 停止。开发时用 `pnpm dev`（相同默认端口）；两者不要同时占用端口。若端口被占用，以终端实际地址为准，或 `pnpm preview --port 4322`。`dist/` 是生成的静态产物，不提交到 Git。

| 命令 | 作用 |
| --- | --- |
| `pnpm check` | Astro／TypeScript、内容、咨询链接断言、文档完整性 |
| `pnpm build` | 占位版构建，随后检查静态内链、元信息、noindex、JS 预算 |
| `pnpm check:http` | 预览运行时检查 16 个页面入口和 5 个 404 路径 |
| `pnpm check:release` | 正式资料检查；当前应失败并列出缺失项 |
| `pnpm build:release` | 以正式模式检查后构建；当前被资料门槛阻止，不执行部署 |

默认构建全部 noindex，不生成 sitemap、canonical 或未发布语言 hreflang。不要用裸 `astro build` 绕过内容检查，发布前还须完成 P2 文案、素材、域名和隐私复核。

## 已实现页面与配置

首页 `/en/`、关于 `/en/about/`、案例总览 `/en/products/`、玻璃钢 `/en/products/fiberglass/`、不锈钢 `/en/products/stainless-steel/`、每类 `preview-01/` 至 `preview-04/` 详情、联系 `/en/contact/`、隐私 `/en/privacy/`。根路径提供英文入口；未知地址真实返回 404。

- [品牌、图片、账号和服务范围](src/data/site.ts)：空值保留占位，不生成假链接；英文品牌未确认。
- [案例数据](src/data/cases.ts)：稳定 ID、语言内容和状态；8 个记录均为 `preview`，正式模式全部排除。
- [英文主要页面文案](src/i18n/en.ts)：业务正文和 SEO；导航等固定界面标签保留在组件中。
- [语言与路由状态](src/i18n/routes.ts)：English 可用，繁中／阿语 Coming soon，未生成对应页面。
- [实现和检查记录](docs/IMPLEMENTATION_STATUS.md)、[截图入口](docs/qa/README.md)、[待补素材](docs/CONTENT_ASSETS.md)。

## 阅读入口

| 文档 | 用途 |
| --- | --- |
| [文档索引](docs/README.md) | 文档状态、阅读顺序、负责人 |
| [开发交接 Prompt](docs/DEVELOPMENT_HANDOFF.md) | 新窗口直接执行英文预览版开发 |
| [产品需求 PRD](docs/PRD.md) | 业务范围、功能、阶段与验收条件 |
| [参考站逆向分析](docs/research/REFERENCE_ANALYSIS.md) | 已确认技术、公开代码证据、推断边界 |
| [技术方案](docs/ARCHITECTURE.md) | 推荐技术栈、内容与组件设计 |
| [多语言与 SEO](docs/I18N_SEO.md) | 语言卡片、路由、RTL 与搜索收录规则 |
| [内容与素材清单](docs/CONTENT_ASSETS.md) | 自有图片、案例资料、联系方式交接 |
| [部署与成本](docs/DEPLOYMENT_COST.md) | 腾讯云、域名、发布与回滚规划 |
| [验收矩阵](docs/ACCEPTANCE.md) | 需求编号与检查方法映射 |
| [决策记录](docs/DECISIONS.md) | 已确认决策与待确认事项 |
| [文档治理](docs/GOVERNANCE.md) | 变更、证据、状态与仓库规范 |
| [一手资料](docs/research/SOURCES.md) | 官方文献与检索日期 |
| [工作计划](docs/PLAN.md) | 阶段交付物及当前进展 |
| [变更记录](CHANGELOG.md) | 版本变化 |

## 当前推荐

Astro 7.4.5 静态生成 + TypeScript 6.0.3 + 原生 CSS + 仓库内类型化内容数据；已提交 pnpm 锁文件。未来由腾讯云 Linux 与 Nginx 提供静态产物，运行时不需要业务后端、数据库、WordPress 或 Node 服务。版本依据和取舍见[架构](docs/ARCHITECTURE.md)。

第一版仅本地预览 `/en/`；繁中与阿语在语言卡片中标明尚未上线，译文完成后独立发布。两类材料为 Fiberglass / FRP 与 Stainless Steel，不添加价格、购物车和支付。

## 文档检查与研究复现

```powershell
node scripts/validate-docs.mjs
node scripts/research-reference.mjs
```

验证器只检查本地文档完整性、链接和需求覆盖，不安装依赖、不访问网络。研究脚本对已知公开资源执行少量 GET 请求，更新证据元数据；原始响应只保留在忽略目录 `.research-cache/`，不进入产品或 Git。研究结果随参考站变化，重新运行后须复核分析文档。
