import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allUsers: null
}

export const allUsersSlice = createSlice({
    name: "allUsersData",
    initialState,
    reducers: {
        getAllUsers: {
            reducer(state, action) {
                state.allUsers = action.payload
            },
            prepare(data) {
                return {
                    payload: data
                }
            }
        }
    }
})


export const allUsers = state => state.allUsersStore.allUsers
export const { getAllUsers } = allUsersSlice.actions
export default allUsersSlice.reducer