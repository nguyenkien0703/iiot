import { IForgotPasswordState } from '@/stores/forgot-password/type'
import { EActionStatus } from '@/stores/type'
import { ScreenForgotPassword } from '@/constants/forgot-password'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: IForgotPasswordState = {
    status: EActionStatus.Idle,
    currentScreen: ScreenForgotPassword.SEND_MAIL,
    email: undefined,
    errorMessage: '',
    errorCode: '',
}

const forgotPasswordSlice = createSlice({
    name: 'forgotPasswordSlice',
    initialState,
    reducers: {
        setCurrentScreen(
            state,
            action: PayloadAction<{ screen: ScreenForgotPassword }>,
        ) {
            state.currentScreen = action.payload.screen
        },
        setEmail(state, action: PayloadAction<{ email: string }>) {
            state.email = action.payload.email
        },
    },
})

export const { setCurrentScreen, setEmail } = forgotPasswordSlice.actions

export default forgotPasswordSlice.reducer
