# 参考站公开代码与结构分析

版本 v0.2；采集日期 2026-11-03。原 P0 范围为公开 HTML、响应头、主题 CSS 与翻译加载脚本；下方追加 P1 桌面／手机浏览器观察。原始采集时间与元数据保持不变。未登录、未提交表单、未读取私有文件、未执行在线翻译。

## 结论

参考站可见实现为 WordPress 与 Elementor 页面构建体系，主题路径包含 Hello Elementor 和 tongmei-child；公开响应声明 LiteSpeed、PHP/8.3.36。多语言入口配置为 GTranslate，默认英文，列表含阿语和简体中文而非繁中，当前配置为同 URL 的客户端翻译模式。可以重建其可见页面结构、CSS 设计参数与交互意图；不能从这些响应还原 PHP 业务源码、数据库、后台管理设置、邮件收件配置或付费授权。

所有版本号为公开声明或资源 URL 参数，不是服务器级验证。它们能识别技术指纹，不能证明实际安装版本、授权状态或没有代理改写。来源为 [E1 首页](https://tongmeisculpture.com/)、[E7 主题 CSS](https://tongmeisculpture.com/wp-content/themes/tongmei-child/style.css?ver=1.0.1)、[E8 翻译加载器](https://tongmeisculpture.com/wp-content/plugins/gtranslate/js/dropdown.js?ver=5.0.1)，并见[证据元数据](reference-evidence.json)。

## 已采样资源

| 证据 | 路径 | 观察 |
| --- | --- | --- |
| E1 | `/` | 首页、导航、语言配置、插件和主题引用 |
| E2 | `/about-us/` | 企业介绍页及同一全站依赖 |
| E3 | `/products/` | 产品归档及分页链接 |
| E4 | `/products/weather-resistant-stainless-steel-sculpture-for-urban-landscape/` | 一个不锈钢详情、分类、相关产品及表单 |
| E5 | `/contact-us/` | 联系文字与 Fluent Forms 标记 |
| E6 | `/blog/` | HTTP 200，但响应有 error-404 搜索表单标记，页面结构异常，需浏览器复核；不能视为健康博客列表 |
| E7 | `/wp-content/themes/tongmei-child/style.css?ver=1.0.1` | 字体、卡片规则与响应式断点 |
| E8 | `/wp-content/plugins/gtranslate/js/dropdown.js?ver=5.0.1` | 下拉框与远端翻译库的加载分支 |

八项均在本次采样返回 200。HTTP 成功不代表业务页面或表单有效。元数据包含最终 URL、采集 UTC 时间和 SHA-256；业务文档日期按 Asia/Shanghai。原始响应保存在 Git 忽略目录，产品不依赖同行资源。

## 前后端证据分级

| 层 | 已确认的公开事实 | 可作出的判断 | 仍未知 |
| --- | --- | --- | --- |
| HTTP 服务 | server 响应头声明 LiteSpeed | 可能由 LiteSpeed 或前置服务返回 | 真实拓扑、CDN、主机地域与负载 |
| 服务端语言 | x-powered-by 声明 PHP/8.3.36 | 与 WordPress PHP 架构一致 | 运行配置、私有 PHP 文件与补丁 |
| CMS | generator 声明 WordPress 7.0.8，含 wp-includes／wp-content | 高置信度 WordPress 站点 | 数据库具体产品、版本、表内容与备份 |
| 页面构建 | Elementor generator 4.3.5，elementor 与 elementor-pro 资源；部分 Pro URL 参数 4.1.1 | Elementor 编辑与服务端页面输出，辅以主题 CSS／JS | 编辑器工程、Pro 授权、是否使用替代插件 |
| 主题 | hello-elementor 和 tongmei-child 的样式引用 | 父主题与自定义子主题的组合 | PHP 模板完整内容、构建历史 |
| 表单 | fluentform 6.2.16 资源、POST 表单及 Demo 标签 | 页面使用 Fluent Forms 客户端；可能通过 WP AJAX 处理 | 实际提交成功、收件地址、SMTP、反垃圾设置 |
| 弹窗 | popup-maker 1.25.0 资源及弹窗配置标记 | 配置了 Popup Maker | 是否在各设备成功展示及转化效果 |
| 页头页脚 | header-footer-elementor 资源 | 使用相关构建插件资源 | 全部模板的编辑配置 |

WordPress 常规需要 PHP 与 MySQL／MariaDB，但这是[官方系统要求](https://wordpress.org/about/requirements/)，不是对同行数据库的实测。未发现足以确认 WooCommerce 的采样证据，不能把展示产品等同于购物商城。

## 多语言如何实现

E1 至 E6 均包含两个 GTranslate 配置实例，可能对应不同菜单或设备模板，但用途未做运行时确认。结构化字段观察：默认语言 en；语言集 en、es、it、pt、de、fr、ru、nl、ar、zh-CN；url_structure 为 none。没有 zh-TW 或 zh-Hant。两实例的 wrapper ID 动态变化，不应硬编码复刻。

E8 的 none 分支会动态加载 `https://cdn.gtranslate.net/widgets/latest/lib.min.js`，并读写客户端语言偏好；也有子域名和子目录的跳转分支，但当前页面配置没有启用。已采样 HTML 未包含 hreflang 关联链接。因未执行远端库，不能确认实际翻译质量、运行可用性、所用套餐或所有语言的索引状况。

特别需要更新旧认知：当前官方插件说明提到 5.0.1 已更换旧翻译组件，原因是旧 Google 网站翻译组件于 2026 年 10 月停止支持。不能把同行当前脚本简单写成旧版 Google Translate Element。官方也区分普通翻译组件与可索引翻译 URL 的 SEO 功能，详见 [GTranslate 官方插件说明](https://wordpress.org/plugins/gtranslate/)。本项目采用离线整理译文与静态独立页面，规避运行时翻译依赖和持续翻译订阅成本。

## 视觉和交互可还原部分

公开样式给出 Playfair Display 标题字体与 Inter 正文字体，白色及暖灰背景、浅色边框、阴影卡片。主题 CSS 包含 12px 卡片圆角、悬停上移约 5px、图像悬停放大、768px 与 480px 网格断点。首页整体流程为首屏与企业引导、精选产品、材料分类、优势、评价、文章、末尾咨询和页脚。以上为结构和样式事实，不是对最终像素效果的浏览器测量。

P1 已用独立组件重建相近层次，只保留玻璃钢和不锈钢；浏览器观察如下。真实图片缺失，未做像素差分，不能承诺像素级还原或声称所有同行功能正常。

## P1 浏览器观察补充（2026-11-03）

环境：Codex in-app browser，Windows；1440×1000 和 390×844 CSS px。接口未暴露具体浏览器版本；这些是模拟 viewport，不是真实手机。仅观察首页／列表、菜单、语言入口及公开样式；没有发送询盘。公开浏览器可访问参考站，web 抓取入口曾报不可访问，两者结果不混同。

- 桌面页头深蓝，实测背景 `rgb(26,26,46)`；暖金按钮 `rgb(201,169,110)`。横向导航、右侧语言下拉及咨询按钮。首屏为多张横幅轮播，随后暖白企业介绍、精选、深色材料区、能力、评价／文章与末尾咨询。观察到定时出现的联系表单弹窗，已关闭，没有填写或提交。
- 手机页头品牌和汉堡按钮，点击展开约 300px 宽的右侧深蓝抽屉，左侧遮罩；导航纵排，语言下拉位于抽屉下部。横幅按宽度缩小，介绍区成为长段文字。打开下拉仅核查可见语言选项，没有实际切换翻译。
- 案例列表有材料筛选和卡片。本站采用独立材料 URL；不复用同行 query 分类或 CMS。公开标题和参数只用于识别页面结构，没有当作本站业务资料。

实现差异：保留深蓝／暖金／暖白分区、衬线标题、四列桌面卡片、圆角与悬停、右侧手机抽屉。主视觉改为空白固定比例槽并叠加原创中性标题，不复制横幅或装饰图；未添加自动轮播，因为没有真实图片。语言按需求改为三语状态卡片。无真实资料的评价、认证、客户、文章及联系表单均省略，增加已确认的六步定制流程。本站[截图](../qa/README.md)只含自有预览页面，同行整页、照片和完整宣传文案没有进入 Git。

## 联系入口核查

E1 至 E6 的公开锚点中未检出 WhatsApp、Facebook、Instagram、mailto 或 tel 协议链接；页面正文有邮箱、电话与地址文字，联系页与详情有表单。Elementor 脚本配置中出现 WhatsApp／Facebook 作为通用分享网络列表，只能说明插件具备这些能力，不能当作同行已接入真实账号。

新站按业主确认，主动实现 WhatsApp 和邮箱链接，配置后再显示 Facebook／Instagram，不复制同行个人信息，也不复制未验证的 Demo 表单。

## 可复现研究

```powershell
node scripts/research-reference.mjs
```

脚本源码为本项目编写，存于[研究脚本](../../scripts/research-reference.mjs)。采集限定为八个已知公开资源，逐项串行，单请求超时 25 秒。只保存事实性元数据供评审；不批量复制图片或全文，不访问管理接口。静态正则分析用于技术指纹初查，不能替代真实 DOM、浏览器和生产网络测试。
