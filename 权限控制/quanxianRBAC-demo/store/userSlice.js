import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        loginUser: (state, action) => {
            if(action.payload === undefined) {   // 不带参数是登出logout
                return null
            }
            return action.payload
        }
    }
})

export const { loginUser } = userSlice.actions;

export const selectUser = state => state.user;

export default userSlice.reducer