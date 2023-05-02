import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedUser: null
}

export const userDataSlice = createSlice({
    name: "selectedUserData",
    initialState,
    reducers: {
        getSelectedUser: {
            reducer(state, action) {
                state.selectedUser = action.payload
            },
            prepare(data) {
                return {
                    payload: data
                }
            }
        }
    }
})


export const selectedUser = state => state.selectedUserStore.selectedUser
export const { getSelectedUser } = userDataSlice.actions
export default userDataSlice.reducer