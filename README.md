# NIGHT RIOT

React + CSS + JavaScript 乐队网站，使用本目录上级提供的四张宣传照和四支真实出场视频；素材已复制到 `public/`，项目可以独立运行。没有后台，也没有默认带声音的背景播放。

## 启动

Windows 本机可以双击 `start-local.cmd`，它会启动开发服务器并自动打开浏览器。首次运行须先完成以下依赖安装。请勿直接打开旧的 localhost 地址：开发服务器关闭后该地址不会继续提供服务。

安装 Node.js 20.19+ 或 22.12+，在本项目目录运行：

```sh
npm install
npm run dev
```

打开终端显示的地址（默认 `http://127.0.0.1:5173`）。项目也支持 pnpm 11.25：`pnpm install`、`pnpm dev`，仓库包含 pnpm 锁文件。不要直接双击 `index.html`，React 需要通过开发服务器运行。

```sh
npm run build
npm run preview
```

`dist/` 是可部署到普通静态托管服务的构建产物。项目使用相对基础路径 `./`，字体、图片、视频、后备图和程序资源均支持域名根目录或 `/night-riot/` 等仓库子目录。

## GitHub Pages

仓库已包含 `.github/workflows/pages.yml`，推送到 `main` 后会安装锁定依赖并检查构建。默认只构建，保留私有仓库的访问范围。需要上线时，先在 Settings → Pages 中启用 GitHub Actions，然后在 Actions 手动运行工作流并勾选 deploy；也可以设置仓库变量 `ENABLE_PAGES=true` 开启后续自动部署。真实网址以部署结果为准，通常为 `https://账号.github.io/仓库名/`。不要将 GitHub 源码仓库地址当作网页地址，也不要直接访问 `src/main.jsx`。

GitHub Pages 是否可用取决于账号套餐与仓库可见性。仓库保持私有时，如套餐不支持 Pages，源码仍可正常保存；需用户明确同意后才改为公开仓库。

相对基础路径的配置遵循 [Vite 官方部署文档](https://vite.dev/guide/static-deploy.html#github-pages)。旧 `chatgpt.site` 地址出现 Cloudflare 403 时属于该域名的访问拦截，不是 React 运行错误；重新发布源码不能保证消除域名拦截。

## 替换资料

唯一配置文件是 `src/data.js`：

- `band`：乐队名称、联系邮箱、社交账号。邮箱为示例；社交链接未配置时显示“即将上线”，填写真实 URL 后会自动成为链接。
- `members`：`id`、`name`、`role`、`roleZh`、`description`、`quote`、`image`、`videoUrl`、`color`、`number`。
- 四位成员的独立视频依次为 `videos/1.mp4`、`videos/2.mp4`、`videos/3.mp4`、`videos/4.mp4`，使用 `publicAsset()` 自动适配部署路径。
- 替换 `public/images/` 与 `public/videos/` 下同名文件，或修改配置路径。放在 `public/` 下的资源在 URL 中不包含 `public`。
- 建议 MP4 使用 H.264 视频与 AAC 音频。远程视频地址需要支持浏览器播放与范围请求。
- `videoUrl` 为空时会显示配置提示，加载失败时显示重试按钮；封面加载失败会显示成员姓名占位。

首页与页脚的品牌大字由视觉排版单独呈现，如更换乐队名称，请同步修改 `HeroSection`、`Navigation`、`Footer`、`index.html` 和图标。

## 组件

`src/main.jsx` 中包含 `HeroSection`、`AboutSection`、`BandMemberCard`、`MemberGrid`、`VideoGallery`、`VideoModal` 与 `Footer`。成员区、影片区与弹窗内切换入口都读取同一份成员数组。

弹窗只有一个 `<video>`，切换成员时卸载旧播放器并暂停、清除来源、重置加载。关闭按钮、遮罩与 Esc 均可关闭，关闭后恢复焦点与页面滚动。支持原生播放控制、重播、被浏览器拦截自动播放时手动开始、加载超时与重试。背景页面在弹窗打开时不可交互。

响应式布局：桌面四列、移动端两列成员卡；影片区桌面两列、手机单列。支持键盘焦点、减少动态效果偏好。字体随站点本地托管；许可见 `public/fonts/`。
