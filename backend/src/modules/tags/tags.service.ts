import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Tag } from './entities/tag.entity'
import { CreateTagDto } from './dto/create-tag.dto'
import { UpdateTagDto } from './dto/update-tag.dto'

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async create(createTagDto: CreateTagDto) {
    const tag = this.tagRepository.create(createTagDto)
    return this.tagRepository.save(tag)
  }

  async findAll() {
    return this.tagRepository.find()
  }

  async findOne(id: number) {
    const tag = await this.tagRepository.findOne({ where: { id } })
    if (!tag) {
      throw new NotFoundException('标签未找到')
    }
    return tag
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    const tag = await this.findOne(id)
    Object.assign(tag, updateTagDto)
    return this.tagRepository.save(tag)
  }

  async remove(id: number) {
    const tag = await this.findOne(id)
    return this.tagRepository.remove(tag)
  }
}