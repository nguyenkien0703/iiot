import { post } from '@/services/fetcher'

const servicePassword = {
    sendEmailForgotPassword: async (payload: { email: string }) => {
        const response = await post<any>('/auths/forgot-password', payload)
        return response.data
    },
    createNewPassword: async (
        token: string,
        payload: { password: string; confirmPassword: string },
    ) => {
        const response = await post<any>(
            `/auths/email/verify/${token}`,
            payload,
        )
        return response.data
    },
    changePassword: async (payload: {
        currentPassword: string
        newPassword: string
    }) => {
        const response = await post<any>('/auths/reset-password', payload)
        return response.data
    },
}

export default servicePassword
