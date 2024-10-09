'use client'
import AuthLayout from '@/components/auth-layout'
import servicePassword from '@/services/password'
import { Button, Form, Input, notification, Typography } from 'antd'
import { AxiosError } from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

const { Text } = Typography

const ResetPassword = () => {
    const router = useRouter()

    const [form] = Form.useForm()
    const [confirmPasswordError, setConfirmPasswordError] = useState<
        string | null
    >(null)
    // get token on Param url
    const searchParams = useSearchParams()
    const tokenFromUrl = searchParams.get('token')
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
    }

    const onFinish = async (values: any) => {
        if (tokenFromUrl) {
            try {
                const response = await servicePassword.createNewPassword(
                    tokenFromUrl,
                    values,
                )
                if (response) {
                    notification.success({
                        message: 'SUCCESS',
                        description: 'CHANGE_PASSWORD_SUCCESS',
                    })
                    router.push('/login')
                }
            } catch (error) {
                if (error instanceof AxiosError) {
                    notification.error({
                        message: 'ERROR',
                        description: 'CHANGE_PASSWORD_FAILED',
                    })
                }
            }
        }
    }

    const validatePassword = (_: any, value: string) => {
        const regex =
            /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

        if (!value) {
            return Promise.reject('PLEASE_ENTER_NEW_PASSWORD')
        }
        if (!regex.test(value)) {
            return Promise.reject('VALID_PASSWORD')
        }
        // Reset confirm password error when password changes
        form.setFields([{ name: 'confirmPassword', errors: [] }])
        setConfirmPasswordError(null)
    }

    return (
        <>
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
                <div>
                    <div className="flex items-center">
                        <Text className="mx-auto text-3xl font-bold ">
                            {'RESET_PASSWORD'}
                        </Text>
                    </div>
                    <div className="mb-8 mt-3 flex items-center justify-center">
                        <Text className="text-sm">
                            {'PLEASE_ENTER_NEW_PASSWORD'}
                        </Text>
                    </div>
                    <div className="mb-6">
                        <Form
                            name="resetPassword"
                            layout="vertical"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                style={{ marginBottom: '24px' }}
                                className="font-semibold"
                                name="password"
                                label={'NEW_PASSWORD'}
                                rules={[
                                    {
                                        required: true,
                                        validator: validatePassword,
                                    },
                                ]}
                            >
                                <Input.Password
                                    size="large"
                                    className="font-normal"
                                />
                            </Form.Item>

                            <Form.Item
                                style={{ marginBottom: '24px' }}
                                className="font-semibold"
                                name="confirmPassword"
                                label={'CONFIRM_PASSWORD'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'REQUIRE_CONFIRM_PASSWORD',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (
                                                !value ||
                                                getFieldValue('password') ===
                                                    value
                                            ) {
                                                return Promise.resolve()
                                            }
                                            return Promise.reject(
                                                new Error(
                                                    'VALID_CONFIRM_PASSWORD',
                                                ),
                                            )
                                        },
                                    }),
                                ]}
                                validateStatus={
                                    confirmPasswordError ? 'error' : ''
                                }
                                help={confirmPasswordError}
                            >
                                <Input.Password
                                    size="large"
                                    className="font-normal"
                                />
                            </Form.Item>
                            <Form.Item style={{ marginBottom: '24px' }}>
                                <Button
                                    size="large"
                                    // type="primary"
                                    htmlType="submit"
                                    className="bg-#5151E5 w-full rounded text-center text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-blue-600 "
                                >
                                    {'BTN_CONFIRM'}
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </AuthLayout>
        </>
    )
}
export default ResetPassword
