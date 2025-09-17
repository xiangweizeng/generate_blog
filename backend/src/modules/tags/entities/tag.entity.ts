import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { Post } from '../../posts/entities/post.entity'

@Entity('tags')
export class Tag {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty()
  @Column({ unique: true })
  name: string

  @ApiProperty()
  @Column({ nullable: true })
  description: string

  @ApiProperty({ type: () => [Post] })
  @ManyToMany(() => Post, post => post.tags)
  posts: Post[]

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date
}