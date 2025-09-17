import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, IsOptional } from 'class-validator'

export class CreateTagDto {
  @ApiProperty({ example: 'TypeScript' })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ example: 'TypeScript相关的文章', required: false })
  @IsString()
  @IsOptional()
  description?: string
}