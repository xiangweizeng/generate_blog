import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum CommentStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export class CreateCommentDto {
  @ApiProperty({ example: '这是一条评论' })
  @IsString()
  content: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  postId: number;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  @IsOptional()
  parentId?: number;
}

export class UpdateCommentDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({ enum: CommentStatus })
  @IsEnum(CommentStatus)
  @IsOptional()
  status?: CommentStatus;
}

export class CommentQueryDto {
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  postId?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  userId?: number;

  @ApiPropertyOptional({ enum: CommentStatus })
  @IsEnum(CommentStatus)
  @IsOptional()
  status?: CommentStatus;
}