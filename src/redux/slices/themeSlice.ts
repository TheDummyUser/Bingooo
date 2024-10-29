import {createSlice} from "@reduxjs/toolkit";

interface ThemeState {
    isDarkTheme: boolean
}

const initialState: ThemeState = {
    isDarkTheme: true
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.isDarkTheme = action.payload
        },
        toggleTheme: (state) => {
            state.isDarkTheme = !state.isDarkTheme
        }
    }
})

export const { setTheme, toggleTheme } = themeSlice.actions
export default themeSlice.reducer