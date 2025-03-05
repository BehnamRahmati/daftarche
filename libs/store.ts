import {configureStore} from "@reduxjs/toolkit"
import { themeSlice } from "./features/global/themeSlice"
import { clipboardSlice } from "./features/clipboards/clipboardSlice"
import { userSlice } from "./features/users/userSlice"
import { langSlice } from "./features/global/langSlice"

export const makeStore = () => {
    return configureStore({
        reducer: {
            theme : themeSlice.reducer,
            clipboard : clipboardSlice.reducer,
            user : userSlice.reducer,
            lang: langSlice.reducer
        }
    })
}


// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']