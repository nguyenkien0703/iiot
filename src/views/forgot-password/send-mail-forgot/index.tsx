import { Button, Form, Input, notification, Typography } from 'antd'
import { useForgotPassword } from '@/stores/forgot-password/hook'
import React from 'react'
import Link from 'next/link'
import { AxiosError } from 'axios'
import servicePassword from '@/services/password'
import { ScreenForgotPassword } from '@/constants/forgot-password'

const { Text } = Typography
const SendMailForgot = () => {
    const {
        forgotPasswordState,
        setScreenForgotPassword,
        setEmailForgotPassword,
    } = useForgotPassword()

    const onFinish = async (values: any) => {
        try {
            const response = await servicePassword.sendEmailForgotPassword({
                email: values.email,
            })
            if (response) {
                notification.success({
                    message: 'SUCCESS',
                    description: 'SUCCESS_SEND_EMAIL_TO_USER',
                })
            }
            setEmailForgotPassword(values?.email)
            setScreenForgotPassword(ScreenForgotPassword.CONFIRM)
        } catch (error) {
            if (error instanceof AxiosError) {
                notification.error({
                    message: 'Lỗi',
                    description: error.response?.data.info.message,
                })
            }
        }
    }
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
    }

    return (
        <>
            <div>
                <Text className="text-3xl font-bold">{'Forgot Password'}</Text>
            </div>
            <div className="mb-8 mt-3 flex items-center justify-center">
                <Text className="text-sm">{'CONTENT FORGOT PASSWORD'}</Text>
            </div>
            <div className="mb-6">
                <Form
                    name="sendEmailForgot"
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    initialValues={{ email: forgotPasswordState.email ?? null }}
                >
                    <Form.Item
                        style={{ marginBottom: '24px' }}
                        className="font-semibold"
                        name="email"
                        label={'Nhập Email của bạn'}
                        rules={[
                            {
                                required: true,
                                message: 'Email là bắt buộc',
                            },
                            {
                                pattern: new RegExp(
                                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                ),
                                message: 'Email không hợp lệ',
                            },
                        ]}
                    >
                        <Input
                            size="large"
                            className="font-normal"
                            placeholder="abc@gmail.com"
                        />
                    </Form.Item>
                    <Form.Item style={{ marginBottom: '24px' }}>
                        <Button
                            size="large"
                            type="primary"
                            htmlType="submit"
                            className="bg-#5151E5 w-full rounded text-center text-sm font-semibold text-white shadow-sm transition  duration-200 hover:bg-blue-600"
                        >
                            {'Request Password Reset'}
                        </Button>
                    </Form.Item>
                    <Link
                        href="/login"
                        className="text-primary-600 flex items-center justify-center font-medium hover:underline"
                    >
                        {'Back To Login'}
                    </Link>
                </Form>
            </div>
        </>
    )
}

export default SendMailForgot
