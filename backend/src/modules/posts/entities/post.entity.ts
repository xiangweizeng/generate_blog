import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { User } from '../../users/entities/user.entity'
import { Comment } from '../../comments/entities/comment.entity'
import { Category } from '../../categories/entities/category.entity'
import { Tag } from '../../tags/entities/tag.entity'

@Entity('posts')
export class Post {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty()
  @Column()
  title: string

  @ApiProperty()
  @Column('text')
  content: string

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User)
  author: User

  @ApiProperty({ type: () => Category })
  @ManyToOne(() => Category)
  category: Category

  @ApiProperty({ type: () => [Tag] })
  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[]

  @ApiProperty({ type: () => [Comment] })
  @OneToMany(() => Comment, comment => comment.post)
  comments: Comment[]

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date
}