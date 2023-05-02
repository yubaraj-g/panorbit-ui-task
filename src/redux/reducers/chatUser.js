import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chatUser: null
}

export const chatUserSlice = createSlice({
    name: "chatUserData",
    initialState,
    reducers: {
        getChatUser: {
            reducer(state, action) {
                state.chatUser = action.payload
            },
            prepare (data) {
                return {
                    payload: data
                }
            }
        }
    }
})


export const chatUser = state => state.chatUserStore.chatUser
export const { getChatUser } = chatUserSlice.actions
export default chatUserSlice.reducer