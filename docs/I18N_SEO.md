# 多语言与 SEO 规范

版本 v0.1；2026-11-03；状态：实施规划。对应 FR-005、FR-009、FR-010、NFR-001。官方依据见[资料目录](research/SOURCES.md)。

## 语言和发布状态

| 语言 | 内部标识与 HTML lang | 网址前缀 | 首个英文版状态 |
| --- | --- | --- | --- |
| English | en | `/en/` | 已实现并通过检查后启用 |
| 繁體中文 | zh-Hant | `/zh-hant/` | coming-soon，不生成正式内容 URL |
| العربية | ar | `/ar/` | coming-soon，不生成正式内容 URL |

根路径 `/` 在生产 Nginx 统一 301 至 `/en/`，英文从首发起保留前缀，后续不迁移英文路径。预览服务如不能输出 HTTP 重定向，可显示明确英文入口，生产重定向单独验证。域名尚未确定，文档中的 example.com 仅为示例，禁止写入生产 canonical。

内部标识、URL 前缀、hreflang 代码分别管理，不将大小写规则混为一谈。繁体为跨地区内容，初始使用 zh-Hant，不强行归为某一个国家或地区。英文覆盖多数目标市场的通用交流；阿语不是中亚、印度所有访客的替代语言，暂不增加俄语等未要求语言。

## 路由规划

| 页面 | 英文 | 后续语言规则 |
| --- | --- | --- |
| 首页 | `/en/` | `/zh-hant/`、`/ar/` |
| 关于 | `/en/about/` | 替换前缀，保持页面键 |
| 案例总览 | `/en/products/` | 同上 |
| 玻璃钢列表 | `/en/products/fiberglass/` | 同上 |
| 不锈钢列表 | `/en/products/stainless-steel/` | 同上 |
| 案例详情 | `/en/products/{material}/{caseSlug}/` | 按案例稳定 ID 找对应语言 slug |
| 联系 | `/en/contact/` | 同上 |
| 隐私说明 | `/en/privacy/` | 内容根据真实数据处理编写 |
| 文章（后续） | `/en/blog/{articleSlug}/` | 有真实文章才发布，不上线空栏目 |

末尾斜杠统一，HTTP 到 HTTPS、www 到选定主域名的重定向在生产统一处理。材料列表和详情不与相同层级 slug 冲突。未知页面返回 404，不重写到首页假装成功。

## 语言卡片交互

使用语言原文显示三项，不使用国旗代替语言。桌面和移动端都能打开和关闭；按钮具有展开状态与可访问名称，键盘可依次操作。第一版只有英文为可访问链接或当前语言状态，其余为有文字说明的非链接条目；“即将上线”不等于已完成翻译。

后续通过页面键／案例 ID 跳转等价语言页，优先留在同一案例。仅某个案例尚无译文时，在该页将对应语言标注暂不可用；不能无提示跳到别的案例、假英文翻译页或首页。明确提供访问目标语言首页的单独入口时，标签应说明去首页。

不根据 IP 强制跳转语言，也不把语言仅保存在 cookie 后改写同一 URL。用户可手动选择，不妨碍爬虫直接访问各语言页面。

## 翻译工作流

英文版定稿 → 导出 UI、页面正文、案例参数、SEO 和图片 alt 文案 → 翻译为繁中与阿语 → 术语和品牌核对 → 人工校对 → 发布状态更新 → 构建／路由／视觉检查 → 发布译文页面。

机器辅助翻译可用于初稿；发布版本在仓库内固定，不在访客浏览时实时请求翻译。繁体需核对用词及标点；阿语需熟悉业务的人审阅专业术语。reviewStatus 未通过的内容不能进入正式站点地图或语言关联。只翻译导航而正文仍为英文不能算三语完成。

## 阿语排版

依据 [W3C 方向标记指南](https://www.w3.org/International/questions/qa-html-dir.en.html)，页面根元素设置 lang="ar" 和 dir="rtl"。CSS 使用 margin-inline、padding-inline、text-align:start 等逻辑属性；图片不整体翻转，方向性箭头逐个判断。邮箱、电话、尺寸、URL 和型号等拉丁片段用 bdi 或明确 LTR 片段隔离，避免标点错位。

检查导航、语言卡片、案例网格、图片缩略图、面包屑、按钮图标、联系方式和 360px 手机布局。阿语字体使用可覆盖字形且许可允许自托管的字体；不直接依赖同行的 Google Fonts 请求。

## SEO 规则

1. 构建输出中直接包含标题、正文、图片信息和内部链接；核心内容不等待 JS 翻译。
2. 各语言可索引页使用各自的绝对 HTTPS 自引用 canonical，不能全部指向英文。
3. 同一等价页集合输出双向 hreflang，含自身；仅包括已发布、可访问、可索引的版本。三语就绪时使用 en、zh-Hant、ar，x-default 指向该页的英文等价页。只有英文阶段不声明不存在的其他语言。
4. 站点地图只包含真实已发布、允许索引且状态正常的页面，排除草稿、占位、错误页和 coming-soon 路由。发布时保证域名与 canonical 一致。
5. 预览与素材占位版使用访问限制或 noindex；需要爬虫识别 noindex 的公开预览，不能同时仅依赖 robots 禁抓。正式发布时显式检查已移除 noindex。
6. 每页唯一且自然的 title／description、清晰 H1 与层级标题、语义内链、图片 alt；避免堆砌“supplier/manufacturer”等关键词。
7. 基础结构化数据可用 Organization、WebSite、BreadcrumbList。只有事实齐全时才输出 Product 相关语义；按需报价的定制业务不捏造价格、评价、库存或 Offer。不能承诺因此获得 Google 产品富结果。
8. 生产保留真实 404；不发布空白博客、占位案例或内容薄弱的多地区复制页。关联图片、OG 和网站图标使用本域自有资源。

语言 URL 与 hreflang 依据 [Google 多语言指南](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)和[语言版本说明](https://developers.google.com/search/docs/specialty/international/localized-versions)。这些是可抓取性的实现依据，搜索是否收录及排名另受内容与搜索系统影响。

## 搜索运维

正式域名就绪后配置 Google Search Console 域名验证和站点地图提交；DNS 验证记录按平台实际提供值操作。是否增加 Bing Webmaster 及分析工具待业主决定。上线检查结果与日期写入[验收矩阵](ACCEPTANCE.md)，不能将提交地图记为已收录。
