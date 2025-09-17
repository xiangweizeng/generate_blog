import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, IsOptional } from 'class-validator'

export class CreateCategoryDto {
  @ApiProperty({ example: '技术' })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ example: '技术相关的文章', required: false })
  @IsString()
  @IsOptional()
  description?: string
}