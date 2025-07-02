import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "dark",
}

const modeSlice = createSlice({
    name: "mode",
    initialState,
    reducers: {
        darkMode: (state)=>{
            state.mode = "dark";
        },
        lightMode: (state) => {
            state.mode = "light";
        }
    }
});

export const {lightMode, darkMode} = modeSlice.actions;
export default modeSlice.reducer;