# 字体与第三方依赖

版本 v0.3；2026-11-05；状态：字体、图片构建依赖及授权来源已记录。

界面字体使用 Fontsource 分发的 Inter 5.3.0（400、500、600）与 Playfair Display 5.3.0（500），只加载本地 Latin 字形文件。没有 Google Fonts 在线请求。中文占位公司名使用系统字体；阿语正式上线前另选并验收合适字体。

- Inter 许可证：[OFL 文本](../public/licenses/Inter-OFL.txt)。
- Playfair Display 许可证：[OFL 文本](../public/licenses/Playfair-Display-OFL.txt)。
- 所有依赖的版本与完整性记录在 [pnpm-lock.yaml](../pnpm-lock.yaml)。源包许可证保留在安装目录中。

站内没有复制参考站照片、Logo、评价或联系方式，没有第三方社交 SDK。2026-11-05 接入的照片来自业主明确授权的 Alan 文件夹（含 PDF 提取），使用 Codex 内置工具编辑；不因去除水印就断言原始创作者身份或称其为已交付案例。来源记录见 [图片清单](IMAGE_ASSETS.md)，仅作为修饰后的材料／造型展示。

sharp 0.35.5 用于本地构建，许可证 Apache-2.0；不向访客加载第三方图片 SDK。后续已按业主要求设计并接入“铸形 NX”图形与浏览器图标，替代文字方框／加号占位。使用内置 image_gen，来源和设计研究见 [品牌方案](BRAND_IDENTITY.md)，未使用参考设计团队的标志素材。
