import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'

export class CreateCommentDto {
  @ApiProperty({ example: '这是一个评论' })
  @IsString()
  @IsNotEmpty()
  content: string
}