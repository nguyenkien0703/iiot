import { Button, Form, notification, Spin, Tooltip, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import {
    accessTime,
    linkSignInEmail,
    ScreenForgotPassword,
} from '@/constants/forgot-password'
import { useForgotPassword } from '@/stores/forgot-password/hook'
import { useRouter } from 'next/navigation'
import { RedoOutlined } from '@ant-design/icons'
import { AxiosError } from 'axios'
import servicePassword from '@/services/password'

const { Text } = Typography
const ConfirmCodeForgot = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [countdown, setCountdown] = useState(accessTime)
    const { forgotPasswordState, setScreenForgotPassword } = useForgotPassword()
    const router = useRouter()
    const onFinish = () => {}

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((preCountDown) =>
                preCountDown > 0 ? preCountDown - 1 : 0,
            )
        })
        return () => clearInterval(timer)
    }, [])

    const handleRetryCode = async () => {
        setIsLoading(true)
        try {
            const response = await servicePassword.sendEmailForgotPassword({
                email: forgotPasswordState.email ?? '',
            })
            if (response) {
                notification.success({
                    message: 'SUCCESS',
                    description: response,
                })
                setCountdown(accessTime)
                setIsLoading(false)
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                notification.error({
                    message: 'ERROR',
                    description: error.response?.data.info.message,
                })
            }
        }
    }

    return (
        <>
            <div>
                <Text className="text-3xl font-bold">
                    {'PLEASE_CHECK_YOUR_EMAIL'}
                </Text>
            </div>
            <div className="mb-8 mt-3">
                <Text className="text-sm">
                    {'WE_HAVE_SENT_A_EMAIL_TO'}{' '}
                    <span className="font-semibold">
                        {forgotPasswordState.email}{' '}
                    </span>
                    {'CHECK_MAIL_{max}_SECONDS'.replace(
                        '{max}',
                        accessTime.toString(),
                    )}
                </Text>
            </div>
            <div className="text-red-500">
                {countdown == 0 && 'LINK_HAS_EXPIRED'}
            </div>
            <div className="mb-6">
                <Form
                    name="confirmCodeForgot"
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    {countdown > 0 ? (
                        <Form.Item style={{ marginBottom: '24px' }}>
                            <Button
                                onClick={() => {
                                    router.push(linkSignInEmail)
                                }}
                                disabled={countdown == 0}
                                size="large"
                                type="primary"
                                htmlType="submit"
                                className="bg-#5151E5 w-full rounded text-center text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-blue-600 "
                            >
                                {'GO_TO_GMAIL'}
                                {countdown >= 0 && '(' + countdown + ')'}
                            </Button>
                        </Form.Item>
                    ) : (
                        <Spin spinning={isLoading} delay={0}>
                            <Tooltip title="Retry Email">
                                <div className="mb-5 flex justify-center">
                                    <RedoOutlined
                                        className="text-xl text-[#1677ff] hover:cursor-pointer hover:text-[#6087b1]"
                                        onClick={handleRetryCode}
                                    />
                                </div>
                            </Tooltip>
                        </Spin>
                    )}
                    <Text
                        className="flex cursor-pointer items-center justify-center font-medium text-[#1677ff] hover:text-[#6087b1] hover:underline"
                        onClick={() =>
                            setScreenForgotPassword(
                                ScreenForgotPassword.SEND_MAIL,
                            )
                        }
                    >
                        {'BACK_TO_PREVIOUS_PAGE'}
                    </Text>
                </Form>
            </div>
        </>
    )
}

export default ConfirmCodeForgot
