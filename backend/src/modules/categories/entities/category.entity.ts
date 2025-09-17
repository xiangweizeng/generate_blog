import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { Post } from '../../posts/entities/post.entity'

@Entity('categories')
export class Category {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty()
  @Column()
  name: string

  @ApiProperty()
  @Column({ nullable: true })
  description: string

  @ApiProperty({ type: () => [Post] })
  @OneToMany(() => Post, post => post.category)
  posts: Post[]

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date
}