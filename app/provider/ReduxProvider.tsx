'use client'

import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/store/store'
import { SessionProvider } from 'next-auth/react'

interface ReduxProviderProps {
  children: ReactNode
}

const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
 <SessionProvider>
       <div>{children}</div>
 </SessionProvider>
    </Provider>
  )
}

export default ReduxProvider
