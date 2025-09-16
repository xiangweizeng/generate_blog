import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  Avatar,
  Flex,
  Button,
  useToast,
} from '@chakra-ui/react'
import MainLayout from '../../layouts/MainLayout'
import { ApiService } from '../../utils/api'
import { useAuthStore } from '../../stores/auth'
import CommentSection from '../../components/CommentSection'

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

interface Post {
  id: number
  title: string
  content: string
  createdAt: string
  author: {
    id: number
    nickname: string
    avatar?: string
  }
}

export default function PostDetail() {
  const router = useRouter()
  const { id } = router.query
  const [post, setPost] = useState<Post | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const toast = useToast()
  const { user } = useAuthStore()
  const api = ApiService.getInstance()

  useEffect(() => {
    if (id) {
      fetchComments()
    }
  }, [id])

  const fetchComments = async () => {
    try {
      const data = await api.getComments(Number(id))
      setComments(data)
    } catch (error) {
      toast({
        title: '错误',
        description: '获取评论失败',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    if (id) {
      fetchPost()
    }
  }, [id])

  const fetchPost = async () => {
    try {
      const data = await api.getPost(Number(id))
      setPost(data)
    } catch (error) {
      toast({
        title: '错误',
        description: '获取文章失败',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const handleDelete = async () => {
    if (!post) return

    try {
      await api.deletePost(post.id)
      toast({
        title: '成功',
        description: '文章已删除',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      router.push('/')
    } catch (error) {
      toast({
        title: '错误',
        description: '删除文章失败',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  if (!post) {
    return null
  }

  const canEdit = user?.id === post.author.id

  return (
    <MainLayout>
      <Container maxW="container.xl" py={8}>
        <Stack spacing={8}>
          <Box>
            <Flex justify="space-between" align="center" mb={4}>
              <Heading size="xl">{post.title}</Heading>
              {canEdit && (
                <Stack direction="row" spacing={4}>
                  <Button
                    colorScheme="blue"
                    onClick={() => router.push(`/posts/${post.id}/edit`)}
                  >
                    编辑
                  </Button>
                  <Button colorScheme="red" onClick={handleDelete}>
                    删除
                  </Button>
                </Stack>
              )}
            </Flex>
            <Flex align="center" color="gray.500" mb={8}>
              <Avatar
                size="sm"
                name={post.author.nickname}
                src={post.author.avatar}
                mr={2}
              />
              <Text mr={4}>{post.author.nickname}</Text>
              <Text>{new Date(post.createdAt).toLocaleDateString()}</Text>
            </Flex>
            <Box
              className="post-content"
              whiteSpace="pre-wrap"
              lineHeight="tall"
              mb={12}
            >
              {post.content}
            </Box>
          </Box>

          <Box>
            <Heading size="lg" mb={6}>
              评论
            </Heading>
            <CommentSection
              postId={post.id}
              comments={comments}
              onCommentAdded={fetchComments}
            />
          </Box>
        </Stack>
      </Container>
    </MainLayout>
  )
}