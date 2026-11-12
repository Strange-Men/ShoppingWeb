# Our Workshop 图库验收

2026-11-12，Asia/Shanghai。图库位于关于页 `/en/about/#our-workshop`。

- 五张新图来自业主提供的车间照片，使用内置图像编辑统一曝光和色调。轮播内有三张横图、两张竖图，均保留完整画面。公司简介旁继续展示原有设备照片。
- 大图与缩略图关系参考 [Swiper Thumbs Gallery](https://swiperjs.com/demos#thumbs-gallery)。手动控制、图外按钮和切换提示参考 [W3C Carousel](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/examples/carousel-1-prev-next/)。原生 CSS 滚动吸附配合少量脚本，图片延迟加载。
- 在浏览器的 1440px 和 390px 模拟视口验证页面无横向溢出。点击确认关于页锚点、前后箭头、缩略图、键盘方向键与 Home／End。390px 下横向滚动后序号与选中图同步，实际打开竖图确认完整显示。
- Node 24.22.1 构建通过，共 27 个 HTML、1,406 个本地链接与资源。26 个页面返回 200／noindex，5 个预期 404。32 张母版生成 105 张 WebP，图片检查通过。
- Sites 版本 5 已发布。匿名检查确认线上关于页 200／noindex，五张新图的 18 个尺寸全部 200、可解码，与构建一致。浏览器实测线上从第 1 张切换至第 2 张并加载成功。[线上检查](online.json)。

[桌面截图](workshop-desktop.jpg) · [手机截图](workshop-mobile.jpg) · [图片检查](media-report.json) · [编辑提示与来源](../../../src/data/photography.json)
