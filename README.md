# 定制雕塑海外官网

楠轩雕塑的定制雕塑与瓶子道具展示及询盘网站。英文品牌 **NanXuan**，WhatsApp 与邮箱已配置。当前包含 17 张授权照片母版和 10 张 AI 生成设计示意图。英文版已上线分享预览，繁中和阿语预留。

当前阶段为 P1 英文素材预览版，更新日期 2026-11-11（Asia/Shanghai）。首页更新了 10 张不同造型图片，产品卡进入对应详情，再连接联系页询价。详细检查见 [本次验收](docs/qa/2026-11-11/README.md)。

v0.3.1 公司标更新：已按业主要求设计“铸形 NX”，替换页头、页脚和浏览器图标，网站整体 UI 保持原样。[设计方案、官方参考与透明文件](docs/BRAND_IDENTITY.md)；需重新导出标志时运行 `pnpm prepare:brand`。

2026-11-05 后续授权：业主要求上线供同事查看的分享预览，覆盖此前“仅本地”的托管限制；仍保持 noindex，不采购域名／服务器，不启用正式案例或正式 SEO。部署状态及换电脑步骤见 [分享预览](docs/SHARED_PREVIEW.md)。

同事查看：[线上英文预览](https://nanxuan-sculpture-preview.tedcodexstudylove667.chatgpt.site/en/)，持链接可访问，无需启动本地终端。已实际通过 62 项线上页面／图片检查。

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
| `pnpm check:http` | 预览运行时检查 26 个页面入口和 5 个 404 路径 |
| `pnpm prepare:media` | 从 27 张 WebP 母版生成 87 张响应式派生图 |
| `pnpm check:media` | 构建并启动预览后检查图片尺寸、体积和 HTTP 加载 |
| `pnpm check:release` | 正式资料检查；当前应失败并列出缺失项 |
| `pnpm build:release` | 以正式模式检查后构建；当前被资料门槛阻止，不执行部署 |

默认构建全部 noindex，不生成 sitemap、canonical 或未发布语言 hreflang。不要用裸 `astro build` 绕过内容检查，发布前还须完成 P2 文案、素材、域名和隐私复核。

## 已实现页面与配置

首页 `/en/`、关于 `/en/about/`、产品总览 `/en/products/`、玻璃钢 `/en/products/fiberglass/`、不锈钢 `/en/products/stainless-steel/`、瓶子道具 `/en/products/bottle-props/`、9 个产品展示详情 `/en/products/design/[id]/`、8 个原有案例模板、联系 `/en/contact/` 和隐私 `/en/privacy/`。

- [品牌、图片、账号和服务范围](src/data/site.ts)：NanXuan 与主要咨询账号已确认；其他空值保留占位。
- [图片清单](src/data/photography.json)和[素材处理说明](docs/IMAGE_ASSETS.md)：来源、尺寸、编辑记录及焦点集中维护；[母版目录](src/assets/photos)随 Git 提交。`dev`、`check`、`build` 自动生成 `public/media/`，派生图不入库；克隆后不需要访问原始 Alan 文件夹。
- [案例数据](src/data/cases.ts)：稳定 ID、语言内容和状态；8 个记录均为 `preview`，正式模式全部排除。
- [英文主要页面文案](src/i18n/en.ts)：业务正文和 SEO；导航等固定界面标签保留在组件中。
- [语言与路由状态](src/i18n/routes.ts)：English 可用，繁中／阿语 Coming soon，未生成对应页面。
- [实现和检查记录](docs/IMPLEMENTATION_STATUS.md)、[截图入口](docs/qa/README.md)、[待补素材](docs/CONTENT_ASSETS.md)。

公司资料已由业主确认：Shenzhen Nanxuan Crafts Co., Ltd.，2012 年成立，约 4,000 m² 车间；仅公开深圳公司／肇庆工厂城市。不锈钢工艺为 forging、assembly、grinding、polishing。照片作为经修饰的材料与造型展示，不配虚构客户、地点或交付故事。8 个详情模板仍为未发布预览，藏于列表的 Case detail previews 折叠区。

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
