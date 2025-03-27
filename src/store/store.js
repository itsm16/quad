import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/userSlice'
import uiReducer from './features/uiSlice'
import todoSlice from './features/todoSlice'

export const store = configureStore({
    reducer:{
        user: userReducer,
        ui: uiReducer,
        todo: todoSlice
    }
})