'use client'

import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/store/store'

interface ReduxProviderProps {
  children: ReactNode
}

const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <div>{children}</div>
    </Provider>
  )
}

export default ReduxProvider
