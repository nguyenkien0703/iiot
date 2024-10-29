import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react'
import GlobalProvider from '@/global-provider'
import WorkspaceLayout from '@/components/workspace-layout'

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] })


export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={roboto.className}>
                <GlobalProvider><WorkspaceLayout>{children}</WorkspaceLayout></GlobalProvider>
            </body>
        </html>
    )
}
