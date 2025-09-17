import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { TagsService } from './tags.service'
import { CreateTagDto } from './dto/create-tag.dto'
import { UpdateTagDto } from './dto/update-tag.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '创建标签' })
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto)
  }

  @Get()
  @ApiOperation({ summary: '获取所有标签' })
  findAll() {
    return this.tagsService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: '获取标签详情' })
  findOne(@Param('id') id: string) {
    return this.tagsService.findOne(+id)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '更新标签' })
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.update(+id, updateTagDto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '删除标签' })
  remove(@Param('id') id: string) {
    return this.tagsService.remove(+id)
  }
}