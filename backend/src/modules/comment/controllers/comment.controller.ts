import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CommentService } from '../services/comment.service';
import { CreateCommentDto, UpdateCommentDto, CommentQueryDto } from '../dto/comment.dto';
import { Comment } from '../entities/comment.entity';

@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '发表评论' })
  @ApiResponse({ status: 201, type: Comment })
  async create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @Get()
  @ApiOperation({ summary: '获取评论列表' })
  @ApiResponse({ status: 200, type: [Comment] })
  async findAll(@Query() query: CommentQueryDto) {
    return this.commentService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取评论详情' })
  @ApiResponse({ status: 200, type: Comment })
  async findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '更新评论' })
  @ApiResponse({ status: 200, type: Comment })
  async update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '删除评论' })
  @ApiResponse({ status: 200 })
  async remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}