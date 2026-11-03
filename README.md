# 定制雕塑海外官网

楠轩雕塑面向欧美、中亚、印度和港澳台的玻璃钢与不锈钢定制雕塑展示及询盘网站。先交付英文版，再推进繁体中文与阿拉伯语。视觉尽量贴近参考站，企业资料与图片使用业主自有内容，缺失项先占位。英文品牌名未定，域名与服务器尚未购买。

当前阶段：前期调研与文档治理，v0.1，2026-11-03（Asia/Shanghai）。尚未实现网站、购买资源或部署。仓库名 ShoppingWeb 不代表购物商城需求。

## 阅读入口

| 文档 | 用途 |
| --- | --- |
| [文档索引](docs/README.md) | 文档状态、阅读顺序、负责人 |
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

Astro 静态生成 + TypeScript + 原生 CSS + 仓库内内容数据；构建后由腾讯云 Linux 与 Nginx 提供 HTML、CSS、JS 和图片。运行时不需要业务后端、数据库、WordPress 或 Node 服务。该选型为技术建议，版本在实施时依据稳定版与引擎兼容性锁定，未安装依赖。

第一版仅发布 `/en/`；繁中与阿语在语言卡片中标明尚未上线，译文完成后独立发布。首发两类材料为 Fiberglass / FRP 与 Stainless Steel，不添加价格、购物车和支付。

## 文档检查与研究复现

```powershell
node scripts/validate-docs.mjs
node scripts/research-reference.mjs
```

验证器只检查本地文档完整性、链接和需求覆盖，不安装依赖、不访问网络。研究脚本对已知公开资源执行少量 GET 请求，更新证据元数据；原始响应只保留在忽略目录 `.research-cache/`，不进入产品或 Git。研究结果随参考站变化，重新运行后须复核分析文档。
