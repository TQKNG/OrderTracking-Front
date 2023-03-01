import {createSlice} from '@reduxjs/toolkit'

const initialState ={
    isLogin: false
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers:{
        SET_LOGIN:(state,action)=>{
            state.isLogin = action.payload
        }
    }
})

export const {SET_LOGIN} = adminSlice.actions;
export default adminSlice.reducer;