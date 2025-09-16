# 博客系统API请求/响应示例

## 1. 注册
### 请求
POST /api/auth/register
```json
{
  "email": "user@example.com",
  "password": "123456",
  "captcha": "abcd"
}
```
### 响应
```json
{
  "id": 1,
  "email": "user@example.com"
}
```

## 2. 登录
### 请求
POST /api/auth/login
```json
{
  "email": "user@example.com",
  "password": "123456",
  "captcha": "abcd"
}
```
### 响应
```json
{
  "token": "jwt-token",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "nickname": "张三"
  }
}
```

## 3. 创建文章
### 请求
POST /api/post/create
```json
{
  "title": "我的第一篇博客",
  "content": "Hello World!",
  "content_type": "markdown",
  "category_ids": [1],
  "tag_ids": [2,3],
  "status": "published",
  "visibility": "public"
}
```
### 响应
```json
{
  "id": 100,
  "title": "我的第一篇博客"
}
```

## 4. 发表评论
### 请求
POST /api/comment/create
```json
{
  "post_id": 100,
  "content": "写得真好！"
}
```
### 响应
```json
{
  "id": 200,
  "content": "写得真好！"
}
```
