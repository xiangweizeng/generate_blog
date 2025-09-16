import { ReactNode } from 'react'
import {
  Box,
  Flex,
  Container,
  Stack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Avatar,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useAuthStore } from '../stores/auth'

type MainLayoutProps = {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  const router = useRouter()
  const { isAuthenticated, user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <Box>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Container maxW="container.xl">
          <Flex h={16} alignItems="center" justifyContent="space-between">
            <NextLink href="/" passHref>
              <Button variant="ghost">博客</Button>
            </NextLink>

            <Flex alignItems="center">
              {isAuthenticated ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded="full"
                    variant="link"
                    cursor="pointer"
                    minW={0}
                  >
                    <Avatar size="sm" name={user?.nickname} src={user?.avatar} />
                  </MenuButton>
                  <MenuList>
                    <NextLink href="/profile" passHref>
                      <MenuItem>个人中心</MenuItem>
                    </NextLink>
                    <MenuItem onClick={handleLogout}>退出登录</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <Stack direction="row" spacing={4}>
                  <NextLink href="/login" passHref>
                    <Button variant="ghost">登录</Button>
                  </NextLink>
                  <NextLink href="/register" passHref>
                    <Button colorScheme="blue">注册</Button>
                  </NextLink>
                </Stack>
              )}
            </Flex>
          </Flex>
        </Container>
      </Box>

      <Box>{children}</Box>
    </Box>
  )
}