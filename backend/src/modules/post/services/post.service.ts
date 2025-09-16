import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { CreatePostDto, UpdatePostDto, PostQueryDto } from '../dto/post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const post = this.postRepository.create(createPostDto);
    return this.postRepository.save(post);
  }

  async findAll(query: PostQueryDto): Promise<Post[]> {
    const queryBuilder = this.postRepository.createQueryBuilder('post');

    if (query.status) {
      queryBuilder.andWhere('post.status = :status', { status: query.status });
    }

    if (query.visibility) {
      queryBuilder.andWhere('post.visibility = :visibility', {
        visibility: query.visibility,
      });
    }

    if (query.categoryId) {
      queryBuilder.innerJoin('post.categories', 'category')
        .andWhere('category.id = :categoryId', { categoryId: query.categoryId });
    }

    if (query.tagId) {
      queryBuilder.innerJoin('post.tags', 'tag')
        .andWhere('tag.id = :tagId', { tagId: query.tagId });
    }

    queryBuilder
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.categories', 'categories')
      .leftJoinAndSelect('post.tags', 'tags')
      .orderBy('post.createdAt', 'DESC');

    return queryBuilder.getMany();
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['author', 'categories', 'tags'],
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.findOne(id);
    Object.assign(post, updatePostDto);
    return this.postRepository.save(post);
  }

  async remove(id: number): Promise<void> {
    const post = await this.findOne(id);
    await this.postRepository.remove(post);
  }
}