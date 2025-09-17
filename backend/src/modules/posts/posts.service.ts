import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Post } from './entities/post.entity'
import { User } from '../users/entities/user.entity'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto, author: User) {
    const post = this.postRepository.create({
      ...createPostDto,
      author,
    })
    return this.postRepository.save(post)
  }

  async findAll() {
    return this.postRepository.find({
      relations: ['author', 'category', 'tags'],
      order: {
        createdAt: 'DESC',
      },
    })
  }

  async findOne(id: number) {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['author', 'category', 'tags'],
    })
    if (!post) {
      throw new NotFoundException('文章未找到')
    }
    return post
  }

  async update(id: number, updatePostDto: UpdatePostDto, author: User) {
    const post = await this.findOne(id)
    if (post.author.id !== author.id) {
      throw new NotFoundException('没有权限修改此文章')
    }
    Object.assign(post, updatePostDto)
    return this.postRepository.save(post)
  }

  async remove(id: number, author: User) {
    const post = await this.findOne(id)
    if (post.author.id !== author.id) {
      throw new NotFoundException('没有权限删除此文章')
    }
    return this.postRepository.remove(post)
  }
}