import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Avatar,
  useToast,
  VStack,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import MainLayout from '../layouts/MainLayout'
import { ApiService } from '../utils/api'
import { useAuthStore } from '../stores/auth'

export default function Profile() {
  const [nickname, setNickname] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const { user, login } = useAuthStore()
  const toast = useToast()
  const router = useRouter()
  const api = ApiService.getInstance()

  useEffect(() => {
    if (user) {
      setNickname(user.nickname)
      setAvatarUrl(user.avatar || '')
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const updateData: {
        nickname?: string
        avatar?: string
        currentPassword?: string
        newPassword?: string
      } = {}

      if (nickname !== user?.nickname) {
        updateData.nickname = nickname
      }

      if (avatarUrl !== user?.avatar) {
        updateData.avatar = avatarUrl
      }

      if (currentPassword && newPassword) {
        updateData.currentPassword = currentPassword
        updateData.newPassword = newPassword
      }

      const updatedProfile = await api.updateProfile(updateData)
      login(updatedProfile.token, updatedProfile.user)

      toast({
        title: '成功',
        description: '个人信息已更新',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })

      setCurrentPassword('')
      setNewPassword('')
    } catch (error) {
      toast({
        title: '错误',
        description: '更新个人信息失败',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  if (!user) {
    router.push('/login')
    return null
  }

  return (
    <MainLayout>
      <Container maxW="container.sm" py={8}>
        <Stack spacing={8}>
          <Heading>个人中心</Heading>
          <VStack spacing={6} align="center">
            <Avatar
              size="2xl"
              name={user.nickname}
              src={user.avatar}
              mb={4}
            />
            <Text fontSize="xl" fontWeight="bold">
              {user.nickname}
            </Text>
            <Text color="gray.500">{user.email}</Text>
          </VStack>
          <Box
            as="form"
            onSubmit={handleSubmit}
            p={8}
            borderWidth={1}
            borderRadius={8}
            boxShadow="lg"
          >
            <Stack spacing={4}>
              <FormControl id="nickname">
                <FormLabel>昵称</FormLabel>
                <Input
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
              </FormControl>
              <FormControl id="avatar">
                <FormLabel>头像URL</FormLabel>
                <Input
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="输入头像图片的URL"
                />
              </FormControl>
              <FormControl id="currentPassword">
                <FormLabel>当前密码</FormLabel>
                <Input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </FormControl>
              <FormControl id="newPassword">
                <FormLabel>新密码</FormLabel>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </FormControl>
              <Button type="submit" colorScheme="blue" mt={4}>
                保存修改
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </MainLayout>
  )
}