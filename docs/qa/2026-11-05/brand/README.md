# 公司标替换检查

2026-11-05；v0.3.1。范围：公司标、页头／页脚复用与浏览器／Apple 图标。原有网页布局、字体、配色、正文及业务交互未改。设计与官方作品研究见 [BRAND_IDENTITY](../../../BRAND_IDENTITY.md)。

## 实际结果

- `pnpm prepare:brand`：从透明母版导出 6 个资源；128px WebP 为 128×107，按原比例显示，不拉伸。
- `pnpm check`：Astro 0 错误／警告／提示，内容、咨询、文档检查通过。
- `pnpm build`：17 HTML／859 本地链接及资源通过；全部 noindex，无正式 SEO 输出；JS gzip 937B。
- `pnpm check:http`：16 入口 200/noindex、5 个预期 404，通过。
- [静态及 HTTP 检查](static-results.json)：17 页各有两个新 NX 标志、三个图标引用；无旧 brand-seal 或 favicon.svg 引用。6 个品牌资源解码成功、HTTP 200，返回体积与本地文件一致。
- [四档浏览器检查](layout-results.json)：360／390／768／1440px，无横向溢出、品牌不与语言／菜单重叠，页头／页脚图形均加载。桌面图形宽 46px、手机宽 36px；浏览器为 Windows Codex in-app browser，版本接口未暴露，模拟视口不代表真实设备。

下部开口修正后重新生成资源、构建并复测四档。截图接口在快速切换视口后曾无法捕获；重新读取当前页面再截图成功，保存的是最终公司标。现有 47 项业务交互是上一素材版本基线，本轮未把它冒充完整重跑结果；公司标没有更改业务交互脚本。没有采购、部署或发送咨询。

## 截图

| 状态 | 文件 |
| --- | --- |
| 网页标志特写 | [页头](header-detail.jpg) |
| 桌面原页面 | [1440px](home-1440.jpg) |
| 手机原页面 | [390px](home-390.jpg) |
| 页脚应用 | [1440px](footer-1440.jpg) |

![页头 NX 公司标](header-detail.jpg)

## 复现

普通预览仍为 `pnpm build`、`pnpm preview`，打开 `http://127.0.0.1:4321/en/`。修改品牌母版后，先执行 `pnpm prepare:brand` 再构建。检查结束停止本轮临时预览服务，按 README 可重新启动。
