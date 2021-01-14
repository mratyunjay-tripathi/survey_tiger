import {createSlice} from '@reduxjs/toolkit';

export const responseSlice=createSlice({
    name: "state",
    initialState:0,
    reducers:{
        createSurvey: (state,action)=>{
            console.log(state,action);
        },
    },
});