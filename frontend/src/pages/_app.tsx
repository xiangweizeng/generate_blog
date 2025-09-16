import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Providers from '../providers'
import theme from '../theme'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Providers>
        <Component {...pageProps} />
      </Providers>
    </ChakraProvider>
  )
}