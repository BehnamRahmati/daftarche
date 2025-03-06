import {configureStore} from "@reduxjs/toolkit"
import themeReducer from "@/libs/features/global/themeSlice"
import langReducer from "@/libs/features/global/langSlice"
import clipboardsReducer from "@/libs/features/clipboards/clipboardSlice"
import userReducer from "@/libs/features/users/userSlice"
import chatReducer from "@/libs/features/chats/chatSlice"


export const makeStore = () => {
    return configureStore({
        reducer: {
            theme : themeReducer,
            clipboard : clipboardsReducer,
            user : userReducer,
            lang: langReducer,
            chat : chatReducer
        }
    })
}


// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']