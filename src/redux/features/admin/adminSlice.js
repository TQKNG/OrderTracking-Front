import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {getLogin} from "./adminService";

const initialState ={
    status: "idle",
    isLogin: false,
    error:"",
    message:"",
    user:{}
}

export const getLoginUser = createAsyncThunk(
    "admin/getLoginUser",
    async(data)=>{
        return await getLogin(data)
    }
)

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers:{
        SET_LOGIN:(state,action)=>{
            state.isLogin = action.payload
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getLoginUser.fulfilled,(state,action)=>{
            state.status = "fulfilled";
            state.user = action.payload;
            state.isLogin = true;
        })
        .addCase(getLoginUser.pending,(state,action)=>{
            state.status = "idle";
            state.isLogin = false;
        })
        .addCase(getLoginUser.rejected,(state,action)=>{
            state.status = "error";
            console.log(action.error);
            state.error = action.error.message;
            state.message = "Either username or password is incorrect";
            state.isLogin = false;
        })
    }
})

export const {SET_LOGIN} = adminSlice.actions;
export default adminSlice.reducer;