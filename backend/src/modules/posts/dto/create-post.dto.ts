import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsArray } from 'class-validator'

export class CreatePostDto {
  @ApiProperty({ example: '如何学习TypeScript' })
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiProperty({ example: '本文将介绍TypeScript的基础知识...' })
  @IsString()
  @IsNotEmpty()
  content: string

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  categoryId?: number

  @ApiProperty({ type: [Number], example: [1, 2, 3] })
  @IsArray()
  @IsOptional()
  tagIds?: number[]
}