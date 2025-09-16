import { Box, Container, Heading, Text, SimpleGrid } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { posts } from '../api'
import PostCard from '../components/PostCard'
import MainLayout from '../layouts/MainLayout'

export default function Home() {
  const { data: posts = [], isLoading } = useQuery('posts', () =>
    posts.getAll({ status: 'published' })
  )

  return (
    <MainLayout>
      <Container maxW="container.xl" py={8}>
        <Box mb={8}>
          <Heading mb={2}>欢迎来到博客</Heading>
          <Text>分享技术，记录生活</Text>
        </Box>

        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {posts.map((post: any) => (
              <PostCard key={post.id} post={post} />
            ))}
          </SimpleGrid>
        )}
      </Container>
    </MainLayout>
  )
}