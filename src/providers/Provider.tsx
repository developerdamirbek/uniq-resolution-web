import { QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider, theme } from 'antd'
import enUS from 'antd/es/calendar/locale/en_US'
import { type PropsWithChildren } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { client } from '../config/query-client'

export const Provider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={client}>
        <ConfigProvider
        
        theme={{ 
          algorithm: theme.defaultAlgorithm,
          token: { 
            colorPrimary: "#3F8CFF",
            fontFamily: "'Poppins', sans-serif",
          } 
        }}
        // eslint-disable-next-line
        locale={enUS as any}
      >
        
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </ConfigProvider>
    </QueryClientProvider>
  )
}
