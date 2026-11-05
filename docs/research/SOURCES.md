# 公开来源与研究文献

版本 v0.2；查询日期 2026-11-03；全部为公开页面与官方一手资料。P0 采样日期保持原样，S-21 起为 P1 实施时重新核查。这里的文献指实施依据，不是学术论文综述。未从资料推导搜索排名、海外速度或同行私有实现。

| 编号 | 来源 | 本项目用途与限制 |
| --- | --- | --- |
| S-01 | [参考站首页](https://tongmeisculpture.com/) | HTML、技术指纹、导航与语言配置；工具抓取不足时用普通 HTTPS GET |
| S-02 | [参考联系页](https://tongmeisculpture.com/contact-us/) | 文字和表单标记；不代表收件测试通过 |
| S-03 | [参考子主题 CSS](https://tongmeisculpture.com/wp-content/themes/tongmei-child/style.css?ver=1.0.1) | 样式参数与响应式线索；未作为本项目源码复制 |
| S-04 | [参考 GTranslate 加载器](https://tongmeisculpture.com/wp-content/plugins/gtranslate/js/dropdown.js?ver=5.0.1) | 配置分支与远端库加载；未执行完整翻译链路 |
| S-05 | [WordPress 系统要求](https://wordpress.org/about/requirements/) | 解释通常的 PHP 与数据库依赖，不是同行数据库实测 |
| S-06 | [Elementor 官方插件页](https://wordpress.org/plugins/elementor/) | 解释 WordPress 页面构建器角色；不确认同行授权 |
| S-07 | [GTranslate 官方插件页](https://wordpress.org/plugins/gtranslate/) | 当前组件变化、翻译组件与 SEO 功能区别；实际同行套餐未知 |
| S-08 | [Astro 国际化路由](https://docs.astro.build/en/guides/internationalization/) | 语言路由能力；静态发布行为仍需构建与服务器验证 |
| S-09 | [Astro 内容集合](https://docs.astro.build/en/guides/content-collections/) | 内容 schema 与集中管理 |
| S-10 | [Astro 图片](https://docs.astro.build/en/guides/images/) | 构建时图片优化与适配 |
| S-11 | [Astro 按需渲染说明](https://docs.astro.build/en/guides/on-demand-rendering/) | 解释静态生成与服务端渲染选择 |
| S-12 | [Google 多语言站点](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites) | 语言独立 URL，避免只靠偏好改写页面 |
| S-13 | [Google 语言版本标记](https://developers.google.com/search/docs/specialty/international/localized-versions) | hreflang 的等价页与返回关联 |
| S-14 | [W3C HTML 方向](https://www.w3.org/International/questions/qa-html-dir.en.html) | 阿语 dir、逻辑属性和双向排版 |
| S-15 | [Google 产品结构化数据](https://developers.google.com/search/docs/appearance/structured-data/product) | 区分基本语义和富结果要求，不造价格和评价 |
| S-16 | [Web Vitals](https://web.dev/articles/vitals) | LCP、INP、CLS 与真实用户指标的定义 |
| S-17 | [Nginx try_files](https://nginx.org/en/docs/http/ngx_http_core_module.html#try_files) | 静态文件路由与真实 404 |
| S-18 | [腾讯云轻量价格](https://cloud.tencent.com/document/product/1207/73452/) | 中国站 Linux 套餐、折扣与超额流量；下单时再核价 |
| S-19 | [腾讯云域名调价](https://cloud.tencent.cn/announce/detail/2514) | 2026-11-01 .com 调价；本项目域名仅预算未报价 |
| S-20 | [腾讯云备案资源要求](https://cloud.tencent.cn/document/product/243/18908) | 区分境外服务器与大陆备案场景 |
| S-21 | [Astro 安装要求](https://docs.astro.build/en/install-and-setup/) | P1 重新核查 Node ≥22.23.4；实际使用 24.22.1 |
| S-22 | [Astro 官方 npm 包](https://registry.npmjs.org/astro/latest) | 2026-11-03 registry latest 7.4.5，Node 引擎与精确版本锁定 |
| S-23 | [Astro 检查器包](https://registry.npmjs.org/@astrojs/check/latest) | Node fetch 核查 0.9.12 peer 只支持 TypeScript ^5／^6 |
| S-24 | [TypeScript 包元数据](https://registry.npmjs.org/typescript/latest) | latest 7.0.2 与检查器不兼容，另核查并安装 6.0.3 |
| S-25 | [pnpm 设置](https://pnpm.io/settings) | pnpm-workspace.yaml 管理 engineStrict、saveExact、allowBuilds；实际 11.25.0 安装验证 |
| S-26 | [sharp 安装与兼容性](https://sharp.pixelplumbing.com/install/) | 2026-11-05 核对 Node-API v9／例如 Node ≥20.9.0、Windows x64 预编译支持；本机 Node 24.22.1 实际生成 WebP 通过，锁定 0.35.5 |

除列出的关键证据外，本次还采样 about-us、products、一个 product-detail 和 blog 资源，完整 URL、时间和哈希见[采样记录](reference-evidence.json)。不将截图、公开宣传文案或服务器响应头当作私有架构的完整证明。

外部来源会更新。框架依赖安装、翻译服务选择、资源购买与正式上线前，重查相关资料；发现差异时更新分析、决策和 CHANGELOG，不静默延用旧结论。
