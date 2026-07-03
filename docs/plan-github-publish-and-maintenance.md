# GitHub 上传与作品内容维护计划

## 目标与范围

- 将当前 Vite + React 作品集纳入 Git 版本管理并上传到 GitHub。
- 保持源码为唯一维护入口，通过修改项目数据、替换静态资源并重新构建来更新网站。
- 为后续启用 GitHub Pages 自动部署预留配置，但首次上传与正式发布可以分开进行。

## 执行步骤及状态

| 阶段 | 状态 | 操作 |
| --- | --- | --- |
| 1. 上传前检查 | 已完成 | `npm run build` 已通过；未发现常见密钥格式或超过 20 MB 的项目文件。仍需用户确认公开内容。 |
| 2. 初始化仓库 | 已完成 | 本地 Git 仓库已初始化，默认分支为 `main`。 |
| 3. 创建 GitHub 仓库 | 待执行 | 已确认创建 `jieqinghua/weekend-vibes` 私有仓库。 |
| 4. 首次提交与上传 | 进行中 | 首批 21 个文件已核对并通过构建检查，准备提交、创建远程仓库并推送 `main`。 |
| 5. 配置 Pages | 待执行 | 修正 Vite `base` 和静态资源路径，添加 GitHub Actions，使 `main` 更新后自动构建并发布 `dist/`。 |
| 6. 后续内容维护 | 待执行 | 修改 `src/data/projects.ts`；图片放入 `public/projects/`；本地检查、提交并推送。 |
| 7. 发布后验收 | 待执行 | 检查线上图片、二维码、第三方嵌入、移动端和外部链接。 |

## 首次上传命令

先在 GitHub 创建一个空仓库，不勾选自动生成 README、`.gitignore` 或 License。然后在项目根目录执行：

```bash
npm run build
git init
git branch -M main
git add .
git commit -m "chore: initialize portfolio site"
git remote add origin https://github.com/<username>/<repository>.git
git push -u origin main
```

将 `<username>` 和 `<repository>` 替换为实际值。若 Git 尚未配置身份，需要先按 Git 提示设置提交用户名和邮箱。

## 日常更新流程

1. 开始修改前执行 `git pull --ff-only`，获取远程最新版本。
2. 在 `src/data/projects.ts` 中新增、删除或调整作品信息。
3. 新增封面图时放入 `public/projects/`，使用稳定、易识别的英文文件名。
4. 运行 `npm run dev` 做页面预览，再运行 `npm run build` 验证生产构建。
5. 使用 `git status` 和 `git diff` 检查本次变更。
6. 执行 `git add`、`git commit`、`git push`。启用 Pages 工作流后，推送到 `main` 会自动更新网站。

建议每次提交只处理一类内容，例如：

```text
content: add portfolio project xxx
content: update jobs monitor description
fix: correct project image path
```

## 关键决策

- GitHub 仓库确定为 `jieqinghua/weekend-vibes`，首次创建为私有仓库；后续由用户自行调整为公开。
- 源码保留在主分支，`dist/` 继续由 `.gitignore` 排除，不手动提交构建产物。
- `*.tsbuildinfo`、`vite.config.js` 和 `vite.config.d.ts` 作为构建缓存或历史产物忽略，不纳入版本管理。
- 推荐通过 GitHub Actions 构建和发布，避免在本地维护 `gh-pages` 分支。
- 作品文字集中维护在 `src/data/projects.ts`；项目图片集中维护在 `public/projects/`。
- 在仓库名称确定前不写死 Vite `base`，因为项目站点需要使用 `/<repository-name>/`，用户主页或自定义域名通常使用 `/`。

## 风险或待确认事项

- GitHub CLI 已重新登录账号 `jieqinghua`。
- 仓库名称已确定为 `weekend-vibes`；未来发布为项目 Pages 时，Vite `base` 应使用 `/weekend-vibes/`。
- 本地仓库已初始化；远程仓库尚待创建。
- 发布前应替换示例 GitHub 链接，并确认微信二维码等个人信息适合公开。
- 不应把 API Key、Token、密码或其他秘密写入前端代码；Vite 构建后的前端内容可被访客读取。
- 后续若多人或多台设备维护，应先拉取再修改，避免直接覆盖远程更新。

## 最后更新时间

2026-07-03（Asia/Shanghai）；本地仓库初始化与首批文件检查完成，准备提交并上传。
