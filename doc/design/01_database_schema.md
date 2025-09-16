# 博客系统数据库表结构设计

## 1. 用户表（user）
- id（bigint, PK）
- email（varchar, 唯一）
- password_hash（varchar）
- nickname（varchar）
- avatar_url（varchar）
- bio（text）
- contact（varchar）
- is_active（bool）
- role_id（bigint, FK）
- created_at（datetime）
- updated_at（datetime）

## 2. 角色表（role）
- id（bigint, PK）
- name（varchar, 唯一）
- description（varchar）

## 3. 用户关注表（user_follow）
- id（bigint, PK）
- follower_id（bigint, FK）
- followee_id（bigint, FK）
- created_at（datetime）

## 4. 分类表（category）
- id（bigint, PK）
- name（varchar）
- parent_id（bigint, FK, 可为null）
- sort_order（int）
- created_at（datetime）
- updated_at（datetime）

## 5. 标签表（tag）
- id（bigint, PK）
- name（varchar, 唯一）
- created_at（datetime）

## 6. 文章表（post）
- id（bigint, PK）
- author_id（bigint, FK）
- title（varchar）
- content（text）
- content_type（varchar, markdown/html）
- status（varchar, draft/published/deleted）
- visibility（varchar, public/private/link）
- scheduled_at（datetime, 可为null）
- view_count（int）
- like_count（int）
- comment_count（int）
- created_at（datetime）
- updated_at（datetime）

## 7. 文章-标签关联表（post_tag）
- id（bigint, PK）
- post_id（bigint, FK）
- tag_id（bigint, FK）

## 8. 文章-分类关联表（post_category）
- id（bigint, PK）
- post_id（bigint, FK）
- category_id（bigint, FK）

## 9. 收藏夹表（favorite_folder）
- id（bigint, PK）
- user_id（bigint, FK）
- name（varchar）
- is_public（bool）
- created_at（datetime）

## 10. 收藏表（favorite）
- id（bigint, PK）
- user_id（bigint, FK）
- post_id（bigint, FK）
- folder_id（bigint, FK）
- created_at（datetime）

## 11. 点赞表（like）
- id（bigint, PK）
- user_id（bigint, FK）
- post_id（bigint, FK）
- created_at（datetime）

## 12. 评论表（comment）
- id（bigint, PK）
- post_id（bigint, FK）
- user_id（bigint, FK）
- parent_id（bigint, FK, 可为null）
- content（text）
- status（varchar, pending/approved/rejected）
- like_count（int）
- created_at（datetime）
- updated_at（datetime）

## 13. 通知表（notification）
- id（bigint, PK）
- user_id（bigint, FK）
- type（varchar）
- content（text）
- is_read（bool）
- created_at（datetime）

## 14. 系统设置表（system_setting）
- id（bigint, PK）
- key（varchar, 唯一）
- value（text）
- updated_at（datetime）

## 15. 敏感词表（sensitive_word）
- id（bigint, PK）
- word（varchar, 唯一）
