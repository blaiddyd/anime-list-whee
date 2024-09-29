// app/providers.tsx
'use client'

import { ApolloProvider } from '@apollo/client/react'
import { ChakraProvider } from '@chakra-ui/react'

import client from './apolloClient'

export const ChakraWrapper = ({ children }: { children: React.ReactNode }) => {
  return <ChakraProvider>{children}</ChakraProvider>
}

export const ApolloWrapper = ({ children }: { children: React.ReactNode }) => {
    return <ApolloProvider client={client}>{children}</ApolloProvider>
  }