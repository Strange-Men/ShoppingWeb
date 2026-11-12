# 分享预览与换电脑启动

2026-11-05（Asia/Shanghai）。业主明确要求将当前前端发布到免费平台供同事审阅，覆盖先前仅本地预览的限制。此授权不包括购买资源、改为可索引正式官网、发布真实案例或合并 PR。

## 仓库与图片完整性

源码位于 [Strange-Men/ShoppingWeb](https://github.com/Strange-Men/ShoppingWeb)，当前开发分支 `codex/p1-english-preview`。公司标完成提交为 `7ebe5e720685cf954e8ef9396b7df4fd14ae27c9`；该提交已同步远端，尚未合并 main。后续发布配置与记录随同一分支提交。

32 张图片母版在 `src/assets/photos/`，公司标母版在 `src/assets/brand/`，网页标志与图标在 `public/brand/`，均由 Git 跟踪。构建自动生成 105 张 `public/media/` 派生图。授权照片和生成图的来源及处理方式记录在 `src/data/photography.json`。

已实际从 GitHub 全新克隆到独立目录，执行 `pnpm install --frozen-lockfile` 与 `pnpm build`：生成 35 张图片、17 HTML，859 个本地链接／资源通过，无旧目录生成文件依赖。本次环境为 Windows、Node 24.22.1、pnpm 11.25.0，不把它写成所有操作系统的兼容性验收。

机器记录见 [独立克隆检查](qa/2026-11-05/portability-report.json)，并逐张解码验证了克隆目录生成的全部 35 图。

新电脑安装上述 Node／pnpm 后：

```powershell
git clone --branch codex/p1-english-preview --single-branch https://github.com/Strange-Men/ShoppingWeb.git ShoppingWeb
Set-Location ShoppingWeb
pnpm install --frozen-lockfile
pnpm build
pnpm preview
```

打开 `http://127.0.0.1:4321/en/`。已有 checkout 则先确认分支并正常 pull，不覆盖未提交改动。开发时可用 `pnpm dev`，也会先生成图片。不要只拉 main 后误以为最新网页丢失。

## 分享部署

采用 Sites 静态托管，项目 ID 为 `appgprj_6aebf877e3008191b2b13be49d44e610`，配置见 [.openai/hosting.json](../.openai/hosting.json)。权限为 public，即持链接可访问；noindex 是索引控制，不是访问密码。没有发送邀请、询盘或邮件。

**已上线，可直接发给同事：[NanXuan 英文分享预览](https://nanxuan-sculpture-preview.tedcodexstudylove667.chatgpt.site/en/)**。Sites 部署工具实际返回 succeeded，并在无登录 cookie／token 的 HTTP 和浏览器中确认可访问，不以预期域名代替发布证明。

当前发布版本 **5**，源码提交 `e31f590352eceb82c4b8534a8b8220320f60759b`，部署 ID `appgdep_6af577fb45c881919148dabf968f76b7`。关于页包含五张车间实拍和手动轮播。线上关于页返回 200 并保留 noindex，18 张新增 WebP 派生图与本地构建逐字节一致。[车间图库验收](qa/2026-11-12/README.md)。

版本 **4** 更新了首页图与产品详情，源码提交 `45cbbe3d9fc3f3b6f4d3360608be26c28064c4a6`，部署 ID `appgdep_6af3df955a28819199816f5c0112735b`。[版本 4 验收](qa/2026-11-11/README.md)。

版本 3 增加瓶子道具分类及原照片图库，源码提交 `e19172e18993ae22d172bf389e22d28ff93c7098`，部署 ID `appgdep_6aec2f0e4f28819184b5fb489b9c75a4`。[旧版分类截图](qa/2026-11-05/bottle-props.jpg)。

版本 2 更新了首页首屏左侧文字、能力和数据。验收记录见 [首屏 QA](qa/2026-11-05/hero/README.md) 和 [线上验证](qa/2026-11-05/hero/online.json)。

版本 1 历史验收：源码 `b862502`，归档 71 文件／5,273,600B。62 项匿名 HTTP 全部通过：16 页面 200／noindex；41 图片及品牌资源 200、可解码且 SHA256 与构建文件一致；5 个错误／未上线地址 404。浏览器实际打开首页，NX 与已加载图片无错误。证据：[部署记录](qa/2026-11-05/shared-deployment.json)、[线上 HTTP](qa/2026-11-05/shared-http-results.json)、[线上截图](qa/2026-11-05/shared-live.jpg)。此结果不代表所有国家网络或真实设备验收。

使用普通 `pnpm build` 的预览产物，保留 noindex、8 个明确未发布案例模板、真实咨询账号；未设置 SITE_MODE=production，也不把分享域名当作公司正式 canonicalOrigin。正式发布资料门槛仍然生效。

发布使用 Sites 技能的源码同步／打包／版本部署流程，源凭据只经隐藏 stdin 使用，不写入仓库或命令行参数。`outputs/` 归档忽略，构建静态文件上传；Alan 原件、PDF、`.research-cache/`、本机路径与凭据不会作为网站资源发布。

## 后续更新

GitHub push 不自动触发该分享站点更新。后续网页变更先构建检查，再按同一项目 ID 保存／部署新版本；不要再次 create_site。URL 与当前发布版本应由部署工具核实后记录。此分享预览不替代腾讯云生产部署计划，也不代表海外区域和正式获客验收通过。
