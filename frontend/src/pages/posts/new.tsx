import { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Stack,
  Heading,
  useToast,
  Container,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import MainLayout from '../layouts/MainLayout'
import { useAuthStore } from '../stores/auth'

export default function NewPost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const router = useRouter()
  const toast = useToast()
  const { token } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // TODO: 实现创建文章的API调用
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      })

      if (!response.ok) {
        throw new Error('创建文章失败')
      }

      toast({
        title: '成功',
        description: '文章已发布',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      router.push('/')
    } catch (error) {
      toast({
        title: '错误',
        description: error instanceof Error ? error.message : '创建文章失败',
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
          <Heading>写文章</Heading>
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
                发布
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </MainLayout>
  )
}