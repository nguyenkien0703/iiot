import { EActionStatus, FetchError } from '@/stores/type'
import { ScreenForgotPassword } from '@/constants/forgot-password'

export interface IForgotPasswordState extends FetchError {
    status: EActionStatus
    currentScreen: ScreenForgotPassword
    email?: string
}
