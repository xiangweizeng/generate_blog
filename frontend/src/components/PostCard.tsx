import { Box, Text, Image, Stack, Heading, Link } from '@chakra-ui/react'
import NextLink from 'next/link'

type PostCardProps = {
  post: {
    id: number
    title: string
    content: string
    author: {
      nickname: string
    }
    createdAt: string
  }
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Box
      p={5}
      shadow="md"
      borderWidth="1px"
      borderRadius="md"
      transition="all 0.2s"
      _hover={{ shadow: 'lg' }}
    >
      <NextLink href={`/posts/${post.id}`} passHref>
        <Link>
          <Stack>
            <Heading size="md">{post.title}</Heading>
            <Text noOfLines={3}>{post.content}</Text>
            <Text fontSize="sm" color="gray.500">
              作者：{post.author.nickname} · {new Date(post.createdAt).toLocaleDateString()}
            </Text>
          </Stack>
        </Link>
      </NextLink>
    </Box>
  )
}