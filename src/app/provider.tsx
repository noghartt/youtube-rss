'use client'

import { CacheProvider } from "@chakra-ui/next-js"
import { ChakraProvider, cookieStorageManager } from "@chakra-ui/react"

import { theme } from '../theme';

type RootProviderProps = {
  children: React.ReactNode;
}

export const RootProvider = ({ children }: RootProviderProps) => (
  <CacheProvider>
    <ChakraProvider
      colorModeManager={cookieStorageManager}
      theme={theme}
    >
      {children}
    </ChakraProvider>
  </CacheProvider>
);
