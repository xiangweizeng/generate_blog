import type { ReactNode } from 'react'
import { useRouter } from 'next/router'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

type Props = {
  children: ReactNode
}

const queryClient = new QueryClient()

export default function Providers({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}