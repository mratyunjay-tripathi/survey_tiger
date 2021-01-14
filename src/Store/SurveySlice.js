import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';

export const createSurvey=createAsyncThunk(
    "survey/createSurvey",
    async(_,thunkAPI)=>{
        const surveyId=String(thunkAPI.getState().surveys.length+1);
        // const surveyId=1;
            console.log(thunkAPI.getState(),surveyId);
        return surveyId;
        }
)


export const surveySlice=createSlice({
    name: "survey",
    initialState:[],
    reducers:{
        addQuestion:(state,action)=>{
            const{surveyId,question,options,type}=action.payload;

            console.log("inside slice",state[0].surveyId,surveyId,question);
            

            const q=state.find((s)=>s.surveyId===surveyId).questions;
            const qId=String(q.length+1);
            q.push({
                qId,
                question,
                type,
                options,
            });
        },

        publishSurvey: (state,action)=>{
                    const{surveyId}=action.payload;
            state.find((s)=>s.surveyId===surveyId).isPublished=true;
        }
       
        },
        extraReducers:{
            [createSurvey.fulfilled]: (state,action)=>{
                
                state.push({questions:[],surveyId:action.payload, isPublished:false});
            }
        }
    
});