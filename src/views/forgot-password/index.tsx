import { Typography } from 'antd'
import AuthLayout from '@/components/auth-layout'
import Image from 'next/image'
import { useForgotPassword } from '@/stores/forgot-password/hook'
import { ScreenForgotPassword } from '@/constants/forgot-password'
import React from 'react'
import SendMailForgot from '@/views/forgot-password/send-mail-forgot'
import ConfirmCodeForgot from '@/views/forgot-password/confirm-code-forgot'

const { Text } = Typography

const ForgotPassword = () => {
    const { forgotPasswordState } = useForgotPassword()

    return (
        <AuthLayout>
            <div className="mb-10 flex items-center justify-center gap-5">
                {/*<Image*/}
                {/*    src={'/images/logo-icon.png'}*/}
                {/*    alt={''}*/}
                {/*    width={48}*/}
                {/*    height={48}*/}
                {/*/>*/}
                <Text className="text-3xl font-bold">
                    {'SinatraNguyen Shop'}
                </Text>
            </div>
            {forgotPasswordState.currentScreen ===
                ScreenForgotPassword.SEND_MAIL && <SendMailForgot />}
            {forgotPasswordState.currentScreen ===
                ScreenForgotPassword.CONFIRM && <ConfirmCodeForgot />}
        </AuthLayout>
    )
}

export default ForgotPassword
