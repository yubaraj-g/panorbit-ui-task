import { configureStore } from "@reduxjs/toolkit";
import selectedUserSlice from "./reducers/userData"
import allUsersSlice from "./reducers/allUsers"
import chatUserSlice from "./reducers/chatUser"


export const store = configureStore({
    reducer: {
        selectedUserStore: selectedUserSlice,
        allUsersStore: allUsersSlice,
        chatUserStore: chatUserSlice
    }
})