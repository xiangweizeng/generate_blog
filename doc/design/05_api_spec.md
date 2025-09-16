# 博客系统核心API接口文档（示例）

## 1. 用户模块

### 1.1 注册
- URL: POST /api/auth/register
- 请求参数：
  - email: string
  - password: string
  - captcha: string
- 响应：
  - 201 Created
  - { "id": 1, "email": "test@example.com" }

### 1.2 登录
- URL: POST /api/auth/login
- 请求参数：
  - email: string
  - password: string
  - captcha: string
- 响应：
  - 200 OK
  - { "token": "jwt-token", "user": { ... } }

### 1.3 获取个人信息
- URL: GET /api/user/profile
- Header: Authorization: Bearer <token>
- 响应：
  - 200 OK
  - { "id": 1, "email": "test@example.com", "nickname": "张三", ... }

## 2. 文章模块

### 2.1 创建文章
- URL: POST /api/post/create
- Header: Authorization: Bearer <token>
- 请求参数：
  - title: string
  - content: string
  - content_type: string
  - category_ids: number[]
  - tag_ids: number[]
  - status: string
  - visibility: string
  - scheduled_at: datetime (可选)
- 响应：
  - 201 Created
  - { "id": 100, "title": "...", ... }

### 2.2 获取文章详情
- URL: GET /api/post/:id
- 响应：
  - 200 OK
  - { "id": 100, "title": "...", "content": "...", ... }

## 3. 评论模块

### 3.1 发表评论
- URL: POST /api/comment/create
- Header: Authorization: Bearer <token>
- 请求参数：
  - post_id: number
  - content: string
  - parent_id: number (可选)
- 响应：
  - 201 Created
  - { "id": 200, "content": "...", ... }

## 4. 分类与标签

### 4.1 获取分类列表
- URL: GET /api/category/list
- 响应：
  - 200 OK
  - [ { "id": 1, "name": "技术", ... }, ... ]

### 4.2 获取标签列表
- URL: GET /api/tag/list
- 响应：
  - 200 OK
  - [ { "id": 1, "name": "Node.js" }, ... ]

## 5. 其他

### 5.1 文件上传
- URL: POST /api/upload/image
- Header: Authorization: Bearer <token>
- 请求：multipart/form-data
- 响应：
  - 201 Created
  - { "url": "https://..." }

---

# 说明
- 所有需要登录的接口需带 Authorization 头部。
- 详细接口字段、分页、错误码、权限说明可根据实际开发进一步细化。
