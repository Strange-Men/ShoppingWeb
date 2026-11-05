# ADR 0001 使用静态生成的展示官网

日期 2026-11-03；状态：已采用并完成 P1 验证；关联 T-001、T-002、T-007。本轮用户明确要求采用此静态技术方向。

## 背景

楠轩雕塑需要接近参考站的前端、多语言、SEO 和海外域名访问；不需要后台，内容确定后少改。服务为两类材料的定制咨询，不处理在线交易。参考站采用 WordPress／Elementor，但后台可编辑能力不是本项目必需。

## 决定

选择 Astro 构建静态多页面，TypeScript 约束数据，原生 CSS 管理视觉与 RTL，少量原生 JS 管理交互。图片与资料放仓库集中配置，部署 dist 到腾讯云 Nginx。第一版无业务 API、数据库、PHP 或常驻 Node 服务。三语内容离线定稿生成独立页面。

## 备选与结果

WordPress／Elementor适合持续后台编辑，但增加数据库、插件与动态服务维护。Next.js 同样能实现静态站，但目前不需要 React 应用状态或服务端动态能力。手写 HTML 可以起步，但语言与案例扩展后维护一致性更难。Astro 在模板复用和静态交付间符合现有约束。

代价是内容修订要构建和发布，业主已接受无后台方向。P1 使用 TypeScript 数据契约与构建前内容检查，不额外引入内容 CMS。框架不带来排名保证。

实施锁定 Astro 7.4.5、TypeScript 6.0.3、@astrojs/check 0.9.12；实际 Node 24.22.1 满足 Astro ≥22.23.4 要求。TypeScript 7.0.2 虽为 registry latest，但检查器 peer 只支持 ^5／^6，选择 6.0.3。环境只有 pnpm，采用 11.25.0 与 pnpm-lock.yaml 代替原建议 npm 锁文件；安装和 frozen-lockfile 检查已通过，不改变运行时静态架构。

## 重新评估触发条件

未来出现多人高频编辑、客户登录、文件上传、在线订单、复杂表单、CRM 或实时内容时，重新评估内容管理与服务端，不把现有静态站强行扩展成业务后端。仅增加新语言或新案例不自动触发换框架。

## 依据

- [Astro 渲染文档](https://docs.astro.build/en/guides/on-demand-rendering/)
- [Astro 内容集合](https://docs.astro.build/en/guides/content-collections/)
- [WordPress 系统要求](https://wordpress.org/about/requirements/)
- [Google 多语言指南](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)
