import { IForgotPasswordState } from '@/stores/forgot-password/type'
import { ScreenForgotPassword } from '@/constants/forgot-password'
import { RootState, useAppDispatch, useAppSelector } from '@/stores'
import { useCallback } from 'react'
import { setCurrentScreen, setEmail } from '@/stores/forgot-password/slice'

type ForgotPasswordType = {
    forgotPasswordState: IForgotPasswordState
    setScreenForgotPassword: (screen: ScreenForgotPassword) => void
    setEmailForgotPassword: (email: string) => void
}
export const useForgotPassword = (): ForgotPasswordType => {
    const dispatch = useAppDispatch()

    const forgotPasswordState = useAppSelector(
        (state: RootState) => state.forgotPassword,
    )

    const setScreenForgotPassword = useCallback(
        (screen: ScreenForgotPassword) => {
            dispatch(setCurrentScreen({ screen }))
        },
        [dispatch],
    )

    const setEmailForgotPassword = useCallback(
        (email: string) => {
            dispatch(setEmail({ email }))
        },
        [dispatch],
    )

    return {
        forgotPasswordState,
        setScreenForgotPassword,
        setEmailForgotPassword,
    }
}
