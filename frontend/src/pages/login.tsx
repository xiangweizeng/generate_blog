import { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  useToast,
  Container,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useAuthStore } from '../stores/auth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const toast = useToast()
  const { login } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // TODO: 实现登录API调用
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error('登录失败')
      }

      const data = await response.json()
      login(data.token, data.user)
      router.push('/')
    } catch (error) {
      toast({
        title: '错误',
        description: error instanceof Error ? error.message : '登录失败',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Container maxW="container.sm">
      <Box mt={8}>
        <Stack spacing={8}>
          <Heading textAlign="center">登录</Heading>
          <Box
            as="form"
            onSubmit={handleSubmit}
            p={8}
            borderWidth={1}
            borderRadius={8}
            boxShadow="lg"
          >
            <Stack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>邮箱</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>密码</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Button type="submit" colorScheme="blue" width="full">
                登录
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Container>
  )
}