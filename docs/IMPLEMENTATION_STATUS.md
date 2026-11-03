# P1 英文预览实现状态

版本 v0.2；2026-11-03（Asia/Shanghai）；状态：代码与本地检查完成，未公网发布。

## 已交付范围

基于原 `main` 文档基线 64675a5 开发，开始时工作区干净。没有重新初始化或覆盖已有文档／研究脚本；在 `codex/p1-english-preview` 分支交付。仓库为 Strange-Men/ShoppingWeb；读取 main 元数据时 protected=false，仍使用分支与 PR 便于审阅，不强推、不擅自合并。

Astro 7.4.5 静态生成、TypeScript 6.0.3、原生 CSS 与 2400B 内联原生 JS（878B gzip）；Node 24.22.1、pnpm 11.25.0。Inter 和 Playfair Display 自托管，许可证随静态产物保留。运行时无后端、数据库、账号登录、购物车、支付、留言表单或分析 SDK。

英文路由已实现：首页、关于、案例总览、Fiberglass / FRP 列表、Stainless Steel 列表、每类 4 个预览详情、联系及隐私。另有根入口和真实 404，共 17 份 HTML。没有空博客页；保留文章类型与布局。核心正文和案例内链均在构建 HTML 中。

三语卡片显示 English 当前状态、繁體中文／العربية Coming soon，未发布语言无链接。`routes.ts` 保留语言前缀、方向和按稳定案例 ID 的等价页映射；CSS 使用逻辑属性，未生成伪翻译或已校对的阿语页面。

## 内容、账号与 SEO

- `src/data/site.ts`：英文品牌、企业资料、账号和主视觉／工厂／材料图，均保持未提供状态；显示中性 SCULPTURE STUDIO 并标记 Brand preview。
- `src/data/cases.ts`：8 个显式 `preview` 记录，每例 3 个图片槽。总计 28 图片槽只是布局容量，未描述真实案例、客户、参数、资质或评价。
- `src/i18n/en.ts`：主要英文页面正文与 SEO。固定控件／导航文字保留在相应组件中，后续翻译时一并抽取和校对。
- 空 WhatsApp／邮箱显示待配置，无可点击假入口；空 Facebook／Instagram 不输出。链接生成函数校验账号、URL 编码标题和正文；正式域名缺失或是 localhost／example／test 时不带分享 URL。所有测试只是构造断言，没有发送询盘。
- 全部预览 HTML `noindex, nofollow`，无 canonical／hreflang／sitemap。robots 允许读取 noindex，不以禁抓代替索引控制。正式模式 sitemap 规则只包含正式页面和 published／approved 案例；当前 build:release 在任何构建前拒绝缺失资料。

## 实际验证

| 检查 | 结果 |
| --- | --- |
| `pnpm install --frozen-lockfile` | 通过，可复用锁文件 |
| `pnpm check` | Astro 0 errors／warnings／hints；内容、咨询和文档检查通过 |
| `pnpm build` | 17 HTML；527 本地链接／资源；每页独立 title／description、一个 H1；预览 SEO 通过 |
| `pnpm check:http` | 16 页面入口 200／noindex；5 个错误或未发布路径 404 |
| 四档浏览器布局 | 360、390、768、1440；7 类页面×4，共 28 次，无横向溢出 |
| 四档关键交互 | 30 项通过：语言卡片、手机菜单、Esc／焦点、材料列表、案例点击／刷新、图片浏览 |
| 手机 Tab 焦点循环 | 正向与反向通过；展开时菜单开关持续可见 |
| 负向门槛 | 正式资料缺失、缺失图片文件、未审核案例误发 published 均按预期拒绝 |

证据在 [QA 入口](qa/README.md)，机器结果包括生成 HTML／HTTP／布局／交互 JSON。浏览器为 Windows Codex in-app browser；接口未暴露精确版本，viewport 为模拟尺寸。参考观察与差异见 [参考分析](research/REFERENCE_ANALYSIS.md)。

## 启动与审阅

在仓库运行 `pnpm install --frozen-lockfile`、`pnpm check`、`pnpm build`、`pnpm preview`。打开 [英文首页](http://127.0.0.1:4321/en/)，保持终端运行；停止用 Ctrl+C。开发改动用 `pnpm dev`。不要同时占用 4321，完整说明见 [README](../README.md)。

P1 预览只有静态展示和本地进程。没有注册任何托管平台站点，没有购买域名／服务器，也没有公网生产部署。Git 推送只同步源码和文档。

## 限制与下一阶段

尚待：英文品牌／Logo、公司简介／公开地区、主要咨询账号、照片授权、真实首发案例及英文定稿。补充顺序与字段见 [素材清单](CONTENT_ASSETS.md)。

当前图片组件只支持本地素材路径、宽高、alt 和延迟加载，未实施真实素材的响应式派生、格式转换和裁切。878B JS 预算结果不代表真实素材性能；未运行海外网络或现场 CWV 验收。未完整执行浏览器禁用 JS、真实手机、生产 TLS／301、真实账号收件、阿语 RTL 和多语言 SEO 验收。P2／P3 这些项目均保留待执行，不阻塞当前占位版。
