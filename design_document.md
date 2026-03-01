# 个人博客网站设计文档

## 1. 项目概述

本项目是一个个人博客网站，使用React作为前端框架，Python作为后端语言。网站主要功能包括文章发布、分类管理、标签管理、评论系统和用户认证。

## 2. 技术栈

### 2.1 前端技术栈
- **框架**: React 18
- **构建工具**: Vite
- **样式**: Tailwind CSS
- **路由**: React Router
- **HTTP客户端**: Axios
- **状态管理**: React Query (用于API数据管理)
- **动画**: Framer Motion
- **表单处理**: React Hook Form
- **Markdown渲染**: React Markdown

### 2.2 后端技术栈
- **语言**: Python 3.9+
- **Web框架**: FastAPI
- **数据库**: PostgreSQL
- **ORM**: SQLAlchemy
- **认证**: JWT (JSON Web Token)
- **数据验证**: Pydantic
- **CORS**: FastAPI CORS
- **依赖管理**: Poetry

## 3. 系统架构

### 3.1 前端架构
- **单页应用 (SPA)**: 所有页面通过React Router进行路由管理
- **组件化设计**: 采用功能组件和布局组件分离的方式
- **状态管理**: 使用React Query管理API数据，本地状态使用useState
- **响应式设计**: 使用Tailwind CSS实现响应式布局

### 3.2 后端架构
- **RESTful API**: 遵循RESTful设计原则
- **分层架构**:
  - 路由层: 处理HTTP请求和响应
  - 服务层: 实现业务逻辑
  - 数据访问层: 与数据库交互
  - 模型层: 定义数据模型
- **异步处理**: 使用FastAPI的异步特性提高性能

## 4. 数据库设计

### 4.1 数据库表结构

#### users表
| 字段名 | 数据类型 | 约束 | 描述 |
|-------|---------|------|------|
| id | SERIAL | PRIMARY KEY | 用户ID |
| username | VARCHAR(50) | UNIQUE NOT NULL | 用户名 |
| email | VARCHAR(100) | UNIQUE NOT NULL | 邮箱 |
| password_hash | VARCHAR(255) | NOT NULL | 哈希后的密码 |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | 更新时间 |

#### posts表
| 字段名 | 数据类型 | 约束 | 描述 |
|-------|---------|------|------|
| id | SERIAL | PRIMARY KEY | 文章ID |
| title | VARCHAR(200) | NOT NULL | 标题 |
| content | TEXT | NOT NULL | 内容 |
| excerpt | TEXT | | 摘要 |
| cover_image | VARCHAR(255) | | 封面图片 |
| author_id | INTEGER | REFERENCES users(id) | 作者ID |
| category_id | INTEGER | REFERENCES categories(id) | 分类ID |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | 更新时间 |
| published | BOOLEAN | DEFAULT TRUE | 是否发布 |

#### categories表
| 字段名 | 数据类型 | 约束 | 描述 |
|-------|---------|------|------|
| id | SERIAL | PRIMARY KEY | 分类ID |
| name | VARCHAR(50) | UNIQUE NOT NULL | 分类名称 |
| slug | VARCHAR(50) | UNIQUE NOT NULL | 分类别名 |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | 更新时间 |

#### tags表
| 字段名 | 数据类型 | 约束 | 描述 |
|-------|---------|------|------|
| id | SERIAL | PRIMARY KEY | 标签ID |
| name | VARCHAR(50) | UNIQUE NOT NULL | 标签名称 |
| slug | VARCHAR(50) | UNIQUE NOT NULL | 标签别名 |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | 更新时间 |

#### comments表
| 字段名 | 数据类型 | 约束 | 描述 |
|-------|---------|------|------|
| id | SERIAL | PRIMARY KEY | 评论ID |
| content | TEXT | NOT NULL | 评论内容 |
| author_id | INTEGER | REFERENCES users(id) | 作者ID |
| post_id | INTEGER | REFERENCES posts(id) | 文章ID |
| parent_id | INTEGER | REFERENCES comments(id) | 父评论ID |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | 更新时间 |
| approved | BOOLEAN | DEFAULT TRUE | 是否批准 |

#### post_tags表 (多对多关系)
| 字段名 | 数据类型 | 约束 | 描述 |
|-------|---------|------|------|
| post_id | INTEGER | REFERENCES posts(id) | 文章ID |
| tag_id | INTEGER | REFERENCES tags(id) | 标签ID |
| PRIMARY KEY | (post_id, tag_id) | | 联合主键 |

## 5. API接口设计

### 5.1 认证接口
- **POST /api/auth/register**: 用户注册
- **POST /api/auth/login**: 用户登录
- **GET /api/auth/me**: 获取当前用户信息
- **PUT /api/auth/password**: 修改密码

### 5.2 文章接口
- **GET /api/posts**: 获取文章列表 (支持分页、分类、标签过滤)
- **GET /api/posts/{id}**: 获取文章详情
- **POST /api/posts**: 创建文章
- **PUT /api/posts/{id}**: 更新文章
- **DELETE /api/posts/{id}**: 删除文章

### 5.3 分类接口
- **GET /api/categories**: 获取分类列表
- **GET /api/categories/{id}**: 获取分类详情
- **POST /api/categories**: 创建分类
- **PUT /api/categories/{id}**: 更新分类
- **DELETE /api/categories/{id}**: 删除分类

### 5.4 标签接口
- **GET /api/tags**: 获取标签列表
- **GET /api/tags/{id}**: 获取标签详情
- **POST /api/tags**: 创建标签
- **PUT /api/tags/{id}**: 更新标签
- **DELETE /api/tags/{id}**: 删除标签

### 5.5 评论接口
- **GET /api/posts/{post_id}/comments**: 获取文章评论
- **POST /api/posts/{post_id}/comments**: 创建评论
- **PUT /api/comments/{id}**: 更新评论
- **DELETE /api/comments/{id}**: 删除评论

## 6. 前端设计

### 6.1 页面结构
- **首页**: 展示最新文章列表，支持分页
- **文章详情页**: 展示文章内容、评论和相关推荐
- **分类页**: 按分类展示文章列表
- **标签页**: 按标签展示文章列表
- **关于页**: 展示个人信息
- **管理后台**:
  - 文章管理: 创建、编辑、删除文章
  - 分类管理: 创建、编辑、删除分类
  - 标签管理: 创建、编辑、删除标签
  - 评论管理: 查看、批准、删除评论
  - 用户设置: 修改个人信息和密码

### 6.2 组件结构
- **布局组件**:
  - Header: 导航栏
  - Footer: 页脚
  - Layout: 主布局

- **功能组件**:
  - PostList: 文章列表
  - PostCard: 文章卡片
  - CommentList: 评论列表
  - CommentForm: 评论表单
  - CategoryList: 分类列表
  - TagList: 标签列表

- **表单组件**:
  - LoginForm: 登录表单
  - RegisterForm: 注册表单
  - PostForm: 文章表单
  - CategoryForm: 分类表单
  - TagForm: 标签表单

## 7. 后端设计

### 7.1 目录结构
```
backend/
├── app/
│   ├── api/
│   │   ├── auth.py
│   │   ├── posts.py
│   │   ├── categories.py
│   │   ├── tags.py
│   │   ├── comments.py
│   │   └── __init__.py
│   ├── services/
│   │   ├── auth_service.py
│   │   ├── post_service.py
│   │   ├── category_service.py
│   │   ├── tag_service.py
│   │   ├── comment_service.py
│   │   └── __init__.py
│   ├── models/
│   │   ├── user.py
│   │   ├── post.py
│   │   ├── category.py
│   │   ├── tag.py
│   │   ├── comment.py
│   │   └── __init__.py
│   ├── schemas/
│   │   ├── auth.py
│   │   ├── post.py
│   │   ├── category.py
│   │   ├── tag.py
│   │   ├── comment.py
│   │   └── __init__.py
│   ├── core/
│   │   ├── config.py
│   │   ├── database.py
│   │   ├── security.py
│   │   └── __init__.py
│   └── __init__.py
├── main.py
├── requirements.txt
└── .env.example
```

### 7.2 模块职责
- **api**: 处理HTTP请求和响应，路由定义
- **services**: 实现业务逻辑
- **models**: 定义数据库模型
- **schemas**: 定义数据验证和序列化
- **core**: 核心配置和工具

## 8. 前后端交互流程

### 8.1 认证流程
1. 用户访问登录页面
2. 输入用户名和密码
3. 前端发送POST请求到 `/api/auth/login`
4. 后端验证用户凭据，生成JWT token
5. 前端存储token到localStorage
6. 后续请求在Authorization header中携带token

### 8.2 文章管理流程
1. 管理员登录后台
2. 点击"创建文章"
3. 填写文章标题、内容、分类、标签
4. 前端发送POST请求到 `/api/posts`
5. 后端验证数据，创建文章
6. 前端显示成功消息，跳转到文章列表

### 8.3 评论流程
1. 用户访问文章详情页
2. 输入评论内容
3. 前端发送POST请求到 `/api/posts/{post_id}/comments`
4. 后端验证数据，创建评论
5. 前端更新评论列表

### 8.4 数据获取流程
1. 用户访问首页
2. 前端发送GET请求到 `/api/posts`
3. 后端返回文章列表
4. 前端渲染文章卡片
5. 用户点击文章，前端发送GET请求到 `/api/posts/{id}`
6. 后端返回文章详情
7. 前端渲染文章内容和评论

## 9. 部署方案

### 9.1 前端部署
- 构建静态文件: `npm run build`
- 部署到静态网站托管服务 (如Vercel、Netlify、GitHub Pages)

### 9.2 后端部署
- 使用Docker容器化
- 部署到云服务器 (如AWS EC2、DigitalOcean、Heroku)
- 配置环境变量和数据库连接
- 设置CORS策略

## 10. 开发计划

1. **环境搭建**: 初始化前端和后端项目
2. **数据库设计**: 创建数据库表结构
3. **后端API开发**: 实现所有API接口
4. **前端页面开发**: 实现所有页面和组件
5. **前后端集成**: 测试API调用和数据流转
6. **功能测试**: 测试所有功能和边界情况
7. **性能优化**: 优化前端加载速度和后端响应时间
8. **部署上线**: 部署到生产环境

## 11. 安全考虑

1. **密码加密**: 使用bcrypt对密码进行哈希处理
2. **JWT认证**: 使用JWT进行用户认证，设置合理的过期时间
3. **CORS配置**: 正确配置CORS策略，避免跨站请求伪造
4. **输入验证**: 使用Pydantic进行数据验证，防止恶意输入
5. **SQL注入防护**: 使用SQLAlchemy ORM，避免直接拼接SQL语句
6. **XSS防护**: 对用户输入进行转义，防止跨站脚本攻击
7. **Rate Limiting**: 对API请求进行速率限制，防止暴力攻击

## 12. 扩展功能

1. **搜索功能**: 实现文章全文搜索
2. **SEO优化**: 添加meta标签、sitemap和robots.txt
3. **社交媒体分享**: 集成社交媒体分享功能
4. **邮件订阅**: 实现文章更新邮件订阅
5. **阅读统计**: 记录文章阅读量
6. **主题切换**: 实现深色模式和浅色模式
7. **多语言支持**: 实现国际化
8. **图片上传**: 集成图片上传功能
9. **Markdown编辑器**: 集成富文本Markdown编辑器
10. **API文档**: 使用FastAPI自动生成API文档