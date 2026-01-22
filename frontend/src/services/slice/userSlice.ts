import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("userInfo");

interface UserState {
    userId: string;
    name: string;
    userType: "ADMIN" | "USER" | "";
    isLoggedIn: boolean;
    token?: string;
}


const initialState: UserState = storedUser
    ? JSON.parse(storedUser)
    : {
        userId: "",
        name: "",
        userType: "",
        isLoggedIn: false,
        token: undefined,
    };

// Slice
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<UserState>) => {
            state.userId = action.payload.userId;
            state.name = action.payload.name;
            state.userType = action.payload.userType;
            state.isLoggedIn = true;
            state.token = action.payload.token;

            localStorage.setItem("userInfo", JSON.stringify(state));
        },
        logout: (state) => {
            state.userId = "";
            state.name = "";
            state.userType = "";
            state.isLoggedIn = false;

            localStorage.removeItem("userInfo");
        },
        updateToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(state));
        },
    },
});


export const { login, logout, updateToken } = authSlice.actions;
export default authSlice.reducer;
