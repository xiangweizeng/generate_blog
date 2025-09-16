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

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const router = useRouter()
  const toast = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // TODO: 实现注册API调用
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, nickname }),
      })

      if (!response.ok) {
        throw new Error('注册失败')
      }

      toast({
        title: '注册成功',
        description: '请登录以继续',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      router.push('/login')
    } catch (error) {
      toast({
        title: '错误',
        description: error instanceof Error ? error.message : '注册失败',
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
          <Heading textAlign="center">注册</Heading>
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
              <FormControl id="nickname" isRequired>
                <FormLabel>昵称</FormLabel>
                <Input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
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
                注册
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Container>
  )
}