/* eslint-disable */
import { Button, Layout } from 'antd'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
const HeaderUser = () => {
    return (
        <Layout.Header className="fixed z-10 h-16 w-full bg-primary px-4 py-0 text-white">
            <div className="flex h-full items-center justify-between">
                <Link href="/">
                    <div className="flex items-center gap-2">
                        <img
                            src="/images/images.png"
                            alt="Traffic Light System"
                            style={{ width: '40px', height: '40px' }}
                        />
                        <span className="text-xl font-bold text-black">Hệ Thống Đèn Giao Thông</span>
                    </div>
                </Link>
                {/* <div className="flex gap-4">
                    <Button type="primary" className="bg-green-600">
                        Báo Cáo
                    </Button>
                    <Button type="primary" className="bg-blue-600">
                        Điều Khiển
                    </Button>
                </div> */}
            </div>
        </Layout.Header>
    )
}

export default HeaderUser
