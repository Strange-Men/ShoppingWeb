# NanXuan 公司标：铸形 NX

业主选定新版曲面标志（附件图 2）。网页使用按原轮廓描绘的[透明矢量图形](../src/assets/brand/nanxuan-mark.svg)，将深色标记改为适合深蓝页首与页尾的暖金色。品牌文字使用可访问的 HTML「NanXuan／楠軒雕塑」，浏览器图示由同一母版生成。下方是上一版标志的历史记录。

2026-11-05；按业主要求，只重做公司标，网站整体 UI 不动。推荐并已接入的方向为“铸形 NX / Carved Form”：用字母结构、体块和负空间表达定制雕塑的制作特征。它是本项目的新设计方案，不代表下方设计团队参与或背书。

## 推荐理由

厚实、连贯的 NX 轮廓对应不锈钢锻造与拼接；内部曲面留白呼应玻璃钢塑形，清晰外缘呼应打磨、抛光后的形体。下部开口专门作了字母识别修正，避免左侧小尺寸看成 D。主体采用香槟金色，兼容原网站深蓝底；保留 NanXuan 与“楠轩雕塑”原有文字、字号和排列，强化英文品牌与中文公司名的联系。

判断标准是小尺寸识别、造型与业务关联、现有界面适配和可复用性。“最推荐”是本项目的设计判断，不是对设计作品的客观排名。只借鉴创作方法，不复制其他机构的标志、字体或图案。

## 联网研究的一手案例

| 设计团队／案例 | 官方作品与可借鉴的方法 | 对楠轩的取舍 |
| --- | --- | --- |
| A Practice for Everyday Life／The Hepworth Wakefield | [官方案例](https://apracticeforeverydaylife.com/case-studies/the-hepworth-wakefield-identity?f=1088)：定制字体呼应建筑与雕塑，标识与材料、雕刻过程关联 | 从实际雕塑工艺出发组织字形，强调体块与留白 |
| Jennifer Morla／SculptureCenter | [官方案例](https://morladesign.com/portfolio/item/sculpture-center-new-york-identity/)：SC 字母组合系统表达体量与维度 | 让 NX 本身形成可独立使用的符号，不加入工具图标或复杂叙事 |
| Wkshps／SculptureCenter | [官方案例](https://www.wkshps.com/work/sculpturecenter)：在保留识别度的基础上更新标识、图形与网站 | 保留 NanXuan 英文名，替换图形，兼容现有网页 |
| Made Thought／G.F Smith | [官方案例](https://madethought.com/work/gf-smith/)：把纸张材料本身放回品牌核心 | 用雕塑材料与形体语言建立公司标，不添加与工艺无关的装饰 |

以上网页于 2026-11-05 阅读；APFEL 案例另用浏览器查看实景呈现。没有下载或提交参考案例图片，也没有采用其文字作为楠轩业务文案。

## 文件与使用

- [透明原始母版](../src/assets/brand/nx-carved-master.png)：内置 image_gen 生成，模型版本接口未暴露。
- [裁切后的透明 PNG](../public/brand/nx-mark.png)：用于单独取用公司标；保留透明度。
- [128px 网页标志](../public/brand/nx-mark-128.webp)／[256px 网页标志](../public/brand/nx-mark-256.webp)：页头、页脚共用，srcset 提供高清选择。
- [32px 浏览器图标](../public/brand/nanxuan-favicon-32.png)／[192px 图标](../public/brand/nanxuan-favicon-192.png)／[180px Apple 图标](../public/brand/nanxuan-apple-touch-icon.png)：深蓝底配金色 NX。
- [Brand.astro](../src/components/Brand.astro) 统一品牌链接；图形为装饰图，链接可访问名称为 NanXuan home，文字名保持真实文本。

桌面图形宽 46px，手机宽 36px，按原比例显示；不旋转、不拉伸、不套用额外高光或阴影。`pnpm prepare:brand` 可从母版重新生成本目录网页资源，脚本见 [prepare-brand.mjs](../scripts/prepare-brand.mjs)。产物随 Git 提交，普通启动与构建无需重新生成公司标。现有照片处理管线不变。

## 最终生成提示词记录

使用 Codex 内置图像工具，未使用 CLI。规范化设计提示：

> Create an original compact NX monogram for NanXuan, a custom sculpture maker in fiberglass and forged stainless steel. Form one sculptural geometric emblem using strong solid strokes, deliberate negative space, a clearly legible N and an integrated crossing X. Balance concave carved voids with precise outer edges. Use restrained champagne brass, a transparent background, substantial open counters, and no surrounding badge, tools, slogans or existing brand elements. Preserve recognition at small website sizes.

最终识别修正提示：

> Open the lower-left counter fully downward to the transparent exterior by removing the bottom connecting bar. The left N upright must end as a free stem, separated at the baseline from the diagonal/right leg, so the mark reads N + X rather than D + X. Preserve the crossing X, upper-right curved notch, compact proportions and strong strokes; no added text, border, cast shadow or new elements.

模型产物带有轻微金色明暗；网页保留该原始细节，不声称交付了单色矢量源文件。处理仅裁掉透明留白、缩放／编码和制作图标底色，母版不改写。前序草稿留在本地忽略目录，不随项目提交。

## 本地检查

网页构建与品牌适配证据见 [公司标 QA](qa/2026-11-05/brand/README.md)。本阶段仍为 noindex 本地预览，未公网发布。
