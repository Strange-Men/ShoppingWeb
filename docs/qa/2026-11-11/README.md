# 图片、英文文案与跳转验收

检查日期 2026-11-11，Asia/Shanghai。

## 交付内容

- 10 张 AI 生成设计示意图，包含首屏、三个分类封面与六个精选产品。产品目录精选 9 款，各分类 3 款，首页展示其中 6 款。首页正文共 10 张图片，来源均不同。
- 图像沿用玻璃钢、不锈钢和瓶子道具三类业务。生成图附有 AI-generated design concept 标签。
- 9 个产品展示详情提供图片、品类说明、Request a Quote 和相关产品。查看详情进入独立页面，Get Quote 进入联系页。
- 照片母版和生成图均保存在 Git 跟踪的 `src/assets/photos/`，构建自动生成 87 张 WebP。

## 实际检查

- `pnpm check` 检查 49 个 Astro 文件，0 错误、0 警告、0 提示，内容及咨询链接断言通过。
- `pnpm build` 生成 27 HTML，静态本地链接与资源通过，元信息唯一，全部 HTML 带 noindex。
- 静态预览的 26 个页面返回 200／noindex，5 个预期错误地址返回 404。
- 27 张母版和 87 张 WebP 尺寸、解码及 HTTP 通过，首页最大回退图总量为 894,098 字节。
- 360、768、1440px 下检查 8 个页面共 24 组合，页面无横向溢出，已加载图片无错误。首页产品卡到详情、详情询价到联系页已实际点击验证。
- 桌面首页 10 张图在滚动后全部加载，图片来源没有重复。完整长图抓取失败，保存首屏和精选区域截图。

截图见 [桌面首屏](home-desktop.jpg)、[手机首屏](home-mobile.jpg) 和 [精选区域](featured-desktop.jpg)。布局记录见 [responsive.json](responsive.json)，图片体积及 HTTP 记录见 [media-report.json](media-report.json)。检查环境为本机模拟尺寸。

全部生成提示与类型在 [photography.json](../../../src/data/photography.json)。使用 Codex 内置图像工具，模型版本接口未暴露。
