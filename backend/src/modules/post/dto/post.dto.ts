import { IsString, IsOptional, IsEnum, IsArray, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum PostStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  DELETED = 'deleted',
}

export enum PostVisibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
  LINK = 'link',
}

export class CreatePostDto {
  @ApiProperty({ example: '我的第一篇博客' })
  @IsString()
  title: string;

  @ApiProperty({ example: '这是博客内容...' })
  @IsString()
  content: string;

  @ApiProperty({ enum: ['markdown', 'html'], default: 'markdown' })
  @IsString()
  contentType: string;

  @ApiProperty({ enum: PostStatus, default: PostStatus.DRAFT })
  @IsEnum(PostStatus)
  status: PostStatus;

  @ApiProperty({ enum: PostVisibility, default: PostVisibility.PUBLIC })
  @IsEnum(PostVisibility)
  visibility: PostVisibility;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  scheduledAt?: Date;

  @ApiPropertyOptional({ type: [Number] })
  @IsArray()
  @IsOptional()
  categoryIds?: number[];

  @ApiPropertyOptional({ type: [Number] })
  @IsArray()
  @IsOptional()
  tagIds?: number[];
}

export class UpdatePostDto extends CreatePostDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  override title?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  override content?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  override contentType?: string;
}

export class PostQueryDto {
  @ApiPropertyOptional()
  @IsEnum(PostStatus)
  @IsOptional()
  status?: PostStatus;

  @ApiPropertyOptional()
  @IsEnum(PostVisibility)
  @IsOptional()
  visibility?: PostVisibility;

  @ApiPropertyOptional()
  @IsOptional()
  categoryId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  tagId?: number;
}