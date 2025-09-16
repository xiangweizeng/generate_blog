import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Textarea,
  useToast,
} from '@chakra-ui/react'
import MainLayout from '../../layouts/MainLayout'
import { ApiService } from '../../utils/api'
import { useAuthStore } from '../../stores/auth'

export default function EditPost() {
  const router = useRouter()
  const { id } = router.query
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const toast = useToast()
  const { user } = useAuthStore()
  const api = ApiService.getInstance()

  useEffect(() => {
    if (id) {
      fetchPost()
    }
  }, [id])

  const fetchPost = async () => {
    try {
      const post = await api.getPost(Number(id))
      // 验证是否是文章作者
      if (user?.id !== post.author.id) {
        toast({
          title: '错误',
          description: '您没有权限编辑此文章',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        router.push('/')
        return
      }
      setTitle(post.title)
      setContent(post.content)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.updatePost(Number(id), { title, content })
      toast({
        title: '成功',
        description: '文章已更新',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      router.push(`/posts/${id}`)
    } catch (error) {
      toast({
        title: '错误',
        description: '更新文章失败',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <MainLayout>
      <Container maxW="container.xl" py={8}>
        <Stack spacing={8}>
          <Heading>编辑文章</Heading>
          <Box
            as="form"
            onSubmit={handleSubmit}
            p={8}
            borderWidth={1}
            borderRadius={8}
            boxShadow="lg"
          >
            <Stack spacing={4}>
              <FormControl id="title" isRequired>
                <FormLabel>标题</FormLabel>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="请输入文章标题"
                />
              </FormControl>
              <FormControl id="content" isRequired>
                <FormLabel>内容</FormLabel>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="请输入文章内容"
                  minH="300px"
                />
              </FormControl>
              <Button type="submit" colorScheme="blue">
                更新
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </MainLayout>
  )
}