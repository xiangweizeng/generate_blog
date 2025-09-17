import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Comment } from './entities/comment.entity'
import { User } from '../users/entities/user.entity'
import { Post } from '../posts/entities/post.entity'
import { CreateCommentDto } from './dto/create-comment.dto'

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(
    postId: number,
    createCommentDto: CreateCommentDto,
    author: User,
  ) {
    const post = await this.postRepository.findOne({ where: { id: postId } })
    if (!post) {
      throw new NotFoundException('文章未找到')
    }

    const comment = this.commentRepository.create({
      ...createCommentDto,
      author,
      post,
    })

    return this.commentRepository.save(comment)
  }

  async findByPost(postId: number) {
    const comments = await this.commentRepository.find({
      where: { post: { id: postId } },
      relations: ['author'],
      order: {
        createdAt: 'DESC',
      },
    })

    return comments
  }

  async remove(id: number, author: User) {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['author'],
    })

    if (!comment) {
      throw new NotFoundException('评论未找到')
    }

    if (comment.author.id !== author.id) {
      throw new NotFoundException('没有权限删除此评论')
    }

    return this.commentRepository.remove(comment)
  }
}