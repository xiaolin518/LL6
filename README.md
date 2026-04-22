# 林进娟的个人学习网站

这是广东科学技术职业学院商学院商务数据分析与应用专业学生林进娟的个人学习网站。

## 项目技术栈

- React 18 + TypeScript
- Vite 构建工具
- Tailwind CSS 样式框架
- Lucide React 图标库

## 项目结构

```
/workspace/
├── src/
│   ├── pages/
│   │   └── Home.tsx      # 首页组件
│   ├── App.tsx           # 应用入口
│   └── main.tsx          # React挂载
├── public/               # 静态资源
└── dist/                 # 构建产物（部署用）
```

## 功能特性

- 个人信息展示
- 5门课程卡片（Python基础、数据分析技术、数据采集与处理、供应链数据分析、数据库原理与应用）
- 响应式设计，适配移动端和桌面端
- 精美的动画效果和交互体验

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 部署到 Cloudflare Pages

### 方法一：通过 Git 仓库部署（推荐）

1. 将代码推送到 GitHub/GitLab 仓库
2. 访问 [Cloudflare Pages](https://pages.cloudflare.com)
3. 点击 "Create a project" → "Connect to Git"
4. 选择你的仓库
5. 配置构建设置：
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
6. 点击 "Save and Deploy"

### 方法二：直接上传文件夹

1. 在本地运行 `npm run build` 生成 `dist` 文件夹
2. 访问 [Cloudflare Pages](https://pages.cloudflare.com)
3. 点击 "Create a project" → "Upload assets"
4. 将整个 `dist` 文件夹拖拽上传
5. 等待部署完成

### 环境变量（如需要）

项目暂不需要特殊环境变量。

## 后续更新

如需添加课程详情页面或更新内容，只需：

1. 修改 `src/pages/Home.tsx` 文件
2. 运行 `npm run build` 重新构建
3. 重新部署到 Cloudflare Pages

## 联系方式

- 作者：林进娟
- 学校：广东科学技术职业学院
- 学院：商学院
- 专业：商务数据分析与应用
