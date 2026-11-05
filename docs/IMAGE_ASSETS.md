# 网页图片清单与处理

v0.3；2026-11-05（Asia/Shanghai）。业主授权使用 Alan 文件夹的 PDF 和图片，并明确接受 Codex 内置图像编辑。工具未暴露具体模型版本，不能声称已指定或核验 image2.5。

## 本轮选择

原目录 `C:\Users\ted.li\Desktop\文档\Alan` 有 27 张 JPG、1 份 10 页 PDF。本轮选择 5 张 JPG 和 PDF 中 5 张图片；原始文件保持不变。未选择的 22 张 JPG 与 PDF 其余图片没有批量处理。图片用于材料／造型呈现，正式项目案例仍暂缓。

| 母版 ID | 原始来源 | 使用位置 |
| --- | --- | --- |
| hero-waterfront | 微信图片_20261103154539_26_32.jpg | 首页主视觉 |
| steel-wings | 微信图片_20261103154539_11_32.jpg | 金色翅膀、钢材入口 |
| steel-leaf | 微信图片_20261103154539_31_32.jpg | 不锈钢叶片喷泉 |
| steel-ring | 微信图片_20261103154539_27_32.jpg | 不锈钢椭圆喷泉 |
| steel-faceted | 微信图片_20261103154539_35_32.jpg | 不锈钢几何造型 |
| frp-qilin | 楠軒宣傳冊.pdf，第 3 页，p03-10-Im420.jpg | 玻璃钢麒麟、材料入口 |
| frp-phoenix | 同 PDF，第 6 页，p06-05-Im788.jpg | 玻璃钢凤凰 |
| frp-mascot | 同 PDF，第 4 页，p04-03-Im678.jpg | 玻璃钢角色造型 |
| frp-letters | 同 PDF，第 7 页，p07-04-Im909.jpg | CREATE 立体字 |
| workshop-cnc | 同 PDF，第 2 页，p02-02-Im134.jpg | 首页／关于页设备照片 |

成品保存在 [src/assets/photos](../src/assets/photos)，每个 ID 对应同名 `.webp`。完整来源文件名、原始 SHA256、母版尺寸、alt、焦点和编辑摘要见 [photography.json](../src/data/photography.json)。全尺寸生成 PNG 与 PDF 提取缓存留在本地忽略目录 `.research-cache/alan/`；原始 PDF、未选照片和私人文件目录不随仓库同步。

## 编辑与真实性

使用内置 image_gen 清除水印、调整曝光／白平衡、整理背景与构图；仅借鉴参考站的简洁照片呈现，不取用参考站照片。保留雕塑的主要形体、材质和颜色，工厂图仅做保守修饰，不添加设备或规模。生成式编辑可能重建局部细节，页面明确标为 retouched presentation imagery，不把它当作未经编辑的交付实录或尺寸依据。

凤凰第一版补出了原图没有展示的完整支撑结构，已弃用并重新编辑；最终母版保留原图裁切的拱架。实体 CREATE 字样属于雕塑本体，保留。统一编辑要求与逐图说明见 [编辑提示词](IMAGE_EDIT_PROMPTS.md)。

## 构建和裁切

[prepare-media.mjs](../scripts/prepare-media.mjs) 使用精确锁定的 sharp 0.35.5，从母版生成 480／800／1200／1600px 宽度（不放大，去重），共 35 张 WebP。质量参数 80、主视觉 82。`public/media/` 是忽略的构建目录；不会改写 Alan 原文件。`Media.astro` 输出尺寸、srcset、sizes、alt；首页首图 eager，其他图 lazy。

桌面画廊为四列方形框、手机两列，采用 contain 保留翅膀、尾部和底座；主视觉 cover，手机单独呈现 16:9 横图后接正文。大图 dialog 支持前后切换、方向键、Esc 和焦点返回。没有使用已编辑图片为 8 个未发布案例编造内容。

## 后续素材

- 正式 Logo 可后补，当前用 NanXuan 文字标识。
- 真实案例名称、地点公开范围、尺寸／工艺和交付照片等到业主决定首发时再整理。
- 如需展示更细的制作能力，可补锻造、拼接、打磨、抛光工序近照；不影响当前预览。
- Facebook／Instagram 主页链接可后补；真实 WhatsApp 会话与邮箱收件由业主设备验证。

当前图片体积与加载检查见 [本轮 QA](qa/2026-11-05/README.md)。海外网络与现场 Core Web Vitals 尚未检查。
