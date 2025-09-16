import { useState } from 'react'
import {
  Box,
  Stack,
  Avatar,
  Text,
  Flex,
  Textarea,
  Button,
  useToast,
} from '@chakra-ui/react'
import { useAuthStore } from '../../stores/auth'
import { ApiService } from '../../utils/api'

interface Comment {
  id: number
  content: string
  createdAt: string
  author: {
    id: number
    nickname: string
    avatar?: string
  }
}

interface CommentSectionProps {
  postId: number
  comments: Comment[]
  onCommentAdded: () => void
}

export default function CommentSection({
  postId,
  comments,
  onCommentAdded,
}: CommentSectionProps) {
  const [content, setContent] = useState('')
  const { isAuthenticated, user } = useAuthStore()
  const toast = useToast()
  const api = ApiService.getInstance()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    try {
      await api.createComment(postId, content)
      setContent('')
      onCommentAdded()
      toast({
        title: '成功',
        description: '评论已发布',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: '错误',
        description: '发布评论失败',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Stack spacing={8}>
      {isAuthenticated && (
        <Box as="form" onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <Flex align="center">
              <Avatar size="sm" name={user?.nickname} src={user?.avatar} mr={2} />
              <Text>{user?.nickname}</Text>
            </Flex>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="写下你的评论..."
              resize="vertical"
            />
            <Button type="submit" colorScheme="blue" alignSelf="flex-end">
              发表评论
            </Button>
          </Stack>
        </Box>
      )}

      <Stack spacing={6}>
        {comments.map((comment) => (
          <Box key={comment.id} p={4} borderWidth={1} borderRadius="md">
            <Flex align="center" mb={2}>
              <Avatar
                size="sm"
                name={comment.author.nickname}
                src={comment.author.avatar}
                mr={2}
              />
              <Box>
                <Text fontWeight="bold">{comment.author.nickname}</Text>
                <Text fontSize="sm" color="gray.500">
                  {new Date(comment.createdAt).toLocaleString()}
                </Text>
              </Box>
            </Flex>
            <Text whiteSpace="pre-wrap">{comment.content}</Text>
          </Box>
        ))}
      </Stack>
    </Stack>
  )
}