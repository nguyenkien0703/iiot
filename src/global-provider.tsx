'use client'
import { Provider as ReduxProvider } from 'react-redux'
import { FC, ReactNode } from 'react'
import { ConfigProvider } from 'antd'
import theme from '@/theme/theme-config'

import { AntdRegistry } from '@ant-design/nextjs-registry'
interface ProvidersProps {
    children: ReactNode
}
const GlobalProvider: FC<ProvidersProps> = ({ children }) => {
    // init state
  
    return (
            <ConfigProvider theme={theme}>
                <AntdRegistry>{children}</AntdRegistry>
            </ConfigProvider>
       
    )
}

export default GlobalProvider
