
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { InputGroup, InputGroupAddon, InputGroupText, Input, Button } from 'reactstrap';
import './css/input.css';

import {surveySlice} from '../Store/SurveySlice';
import { useHistory, useParams } from 'react-router-dom';

function SingleSelect(props){

    const history=useHistory();
    const dispatch=useDispatch();
    const {surveyId}=useParams();
    const [answer,setAnswer]=useState(["",""]);
    const [question,setQuestion]=useState("");
   
    const updateOption=(index,event)=>{
      answer[index]=event.target.value;
      setAnswer(answer=>[...answer]);
    }
   
    const areButtonsDisabled=()=>{
      return (question.trim()==="" || answer.find((element)=> element==="")!==undefined);
    }

    const AddQuestionAction=()=>{
      
        const payload={
          question,
          options: answer,
          surveyId,
          type:"single"
        };

        dispatch(surveySlice.actions.addQuestion(payload));
        history.push(`/createsurvey/${surveyId}?clear=true`);
    }

    const PublishSurveyAction=()=>{
      const payload={
        question,
        options: answer,
        surveyId,
        type:"single"
      };

      dispatch(surveySlice.actions.addQuestion(payload));
      history.push(`/confirm/${surveyId}`);
    }

    return (
    <div className="single-select">
        <InputGroup className="input-style">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>?</InputGroupText>
        </InputGroupAddon>
        <Input placeholder="Write question here" value={question} onChange={(e)=>setQuestion(e.target.value)} />
      </InputGroup>
        <p className="option-text">Options</p>
       { answer.map((element,index) => {
           return( <InputGroup key={index} className="input-style">
            <Input placeholder={`option ${index+1}`} value={element} onChange={(e)=>updateOption(index,e)} >
                
            </Input>
            <InputGroupAddon  addonType="append">
              <Button className="option-btn" disabled={true}>+</Button>
              <Button className="option-btn" disabled={true}>-</Button>
            </InputGroupAddon>
          </InputGroup>);
        })
        }
        {answer.length===2?<>
        <Button className="btn-main" disabled={areButtonsDisabled()} onClick={AddQuestionAction}>Add Question</Button>
        <Button className="btn-main" disabled={areButtonsDisabled()} onClick={PublishSurveyAction}>Publish</Button></>:null}
        </div>
    );

}

export default SingleSelect;