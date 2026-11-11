# 图片编辑提示词记录

## 2026-11-11 产品设计示意图

使用 Codex 内置图像生成工具，以楠轩确认的三类产品为出发点生成新造型。模型版本接口未暴露。完整提示保存在 [图片清单](../src/data/photography.json) 中各 `concept-*` 记录的 `editing` 字段。对应的 WebP 母版位于 `src/assets/photos/`。

- 首屏为厂房场景中的不锈钢新月雕塑，横向构图并在左侧留出排版空间。
- 分类封面分别用折面不锈钢、蓝灰色玻璃钢兔、陶土色与浅绿瓶子道具。
- 精选分别用拉丝波浪和镜面镂空不锈钢、玻璃钢鹤与蝠鲼、黑金香水瓶与橄榄色按压瓶。

生成图采用自然侧光、克制的工厂或展厅背景和完整主体构图。站内标注为 AI-generated design concept。合成场景仅用作概念背景。

## 2026-11-05 官网产品照片补充

7 张照片来自 `Alan/官网图片` 下的瓶子、不锈钢和卡通目录。使用 Codex 内置图像编辑，平台接口未提供可指定或核验的版本号。来源与文件摘要记录在 `src/data/photography.json`。

提示词要点为近方形构图、完整主体、自然照明和适当留白。参照原图保留产品造型、数量、材质和主色，清理背景杂物并调整曝光。成品作为修饰展示图使用。

2026-11-05；Codex 内置 image_gen；模型版本接口未暴露。以下为实际执行要求的规范化记录，共同约束加逐图要求组成可复用提示；不是逐字工具调用日志。来源和选定输出见 [素材清单](IMAGE_ASSETS.md)。

## 共同约束

Edit the supplied image for an English custom-sculpture website. Preserve the main sculpture's identity, proportions, distinctive geometry, material and colour. Remove overlaid watermarks and distracting text; reconstruct the obscured area naturally. Improve exposure, white balance and photographic clarity. Use restrained architectural photography, neutral daylight and a quiet background. Do not add people, branding, logos, client claims, new sculptures or invented structural features. Do not turn the sculpture into a different design. Keep the full important silhouette within the composition. The result is retouched presentation imagery.

## 逐图要求

| ID | 附加编辑要求 |
| --- | --- |
| hero-waterfront | Wide 16:9 architectural presentation. Retain stainless sail shapes, brushed metal and flowing water. Extend the riverfront composition naturally with quiet space on the left for website copy and sculptures on the right. Balance natural daylight and remove overlays. No text in the output. |
| steel-wings | Remove the large white HENG XIN TA METAL overlay and rebuild the obscured stems and floor. Retain feather geometry, golden finish and circular base. Replace distracting gallery artworks with a restrained warm-grey gallery setting and soft balanced light. Portrait composition with safe space around both wings. |
| steel-leaf | Retain the leaf silhouette, perforations, metal reflections and fountain base. Balance the warm cast and lighting. Tidy background distractions without altering the sculpture. Safe full portrait framing. Remove overlay watermark. |
| steel-ring | Retain the oval geometry, star and circular openings, mirror metal and fountain. Improve natural daylight and clarity. Keep the whole sculpture in the portrait composition. Remove the corner overlay. |
| steel-faceted | Preserve the faceted geometric steel sculpture, its angular proportions, circular fountain and reflections. Correct light and colour; tidy the architectural setting. Remove overlays and retain the complete subject. |
| frp-qilin | Preserve the qilin's pose, horns, scales, copper-and-green colouring and plinth. Improve clarity and daylight; create a quieter garden presentation. Do not invent ornaments or change its shape. Remove overlay watermarks. |
| frp-phoenix | Conservative revision from the original image: preserve the exact phoenix pose, wing and tail silhouette, colours, and the original cropped arch and visible support framing. Do not complete, extend or invent the arch foundations or new structural supports. Balance blue sky, natural light and clarity; remove watermarks and small distractions. Keep the same essential composition. This final revision supersedes the rejected first output. |
| frp-mascot | Preserve the yellow fruit character, leaves, facial expression, red heart and bench. Improve clarity and natural daylight; tidy the outdoor background. Keep the complete character and bench without adding new branding or props. Remove overlays. |
| frp-letters | Preserve the exact physical CREATE letters, varied letter heights, red finish and stone plinth. Use soft neutral daylight and a tidier garden backdrop. Keep the actual artwork lettering; do not replace it with generated words. Remove overlaid watermarks only. |
| workshop-cnc | Conservative photographic correction only: improve exposure, white balance, noise and clarity. Preserve the exact machine count and arrangement, walls, cables, floor markings and visible workshop space. Do not add equipment, staff, floor area or production capacity. |

生成结果已逐张查看后转成网站 WebP 母版；网页截图用于复核裁切和比例。原图、PDF 提取和弃用版本均不覆盖、不作为正式案例发布。
