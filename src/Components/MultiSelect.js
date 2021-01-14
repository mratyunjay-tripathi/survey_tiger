import React, { useState } from 'react';
import { useParams,useHistory } from 'react-router-dom';
import { InputGroup, InputGroupAddon, InputGroupText, Input, Button } from 'reactstrap';
import './css/input.css';
import {surveySlice} from '../Store/SurveySlice';
import { useDispatch } from 'react-redux';


function MultiSelect(props){

  const{surveyId}=useParams();
  const dispatch=useDispatch();
  const history=useHistory();

    const [answer,setAnswer]=useState([""]);
    const [question,setQuestion]=useState("");
   
    const updateOption=(index,event)=>{
      answer[index]=event.target.value;
      setAnswer(answer=>[...answer]);
    }
    
    const Add=(index)=>{
        if(answer.length<4){

        answer.splice(index+1,0,"");
            setAnswer(answer=>[...answer]);
        }
    }
    const Delete=(index)=>{
        answer.splice(index,1);
        setAnswer([...answer]);
    }

    const areButtonsDisabled=()=>{
      return (question.trim()==="" || answer.find((element)=> element==="")!==undefined);
    }

    const AddQuestionAction=()=>{
      
      const payload={
        question,
        options: answer,
        surveyId,
        type:"MultiSelect"
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
    <div className="multi-select">
        <InputGroup className="input-style">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>?</InputGroupText>
        </InputGroupAddon>
        <Input placeholder="Write question here" value={question} 
                onChange={(e)=>setQuestion(e.target.value)}/>
      </InputGroup>

      <p className="option-text">Options</p>
       { answer.map((element,index) => {
           return( <InputGroup key={index} className="input-style">
            <Input placeholder={`option ${index+1}`}  value={element} onChange={(e)=> updateOption(index,e)}>
                
            </Input>
            <InputGroupAddon className="option-btn" addonType="append">
              <Button className="option-btn" onClick={()=>Add(index)}
               disabled={answer.length===4}>+</Button>
              <Button className="option-btn" onClick={()=>Delete(index)}
               disabled={answer.length===1}>-</Button>
            </InputGroupAddon>
          </InputGroup>);
        })
        }
        {answer.length===4?<>
        <Button className="btn-main" disabled={areButtonsDisabled()} onClick={AddQuestionAction}>Add Question</Button>
        <Button className="btn-main" disabled={areButtonsDisabled()} onClick={PublishSurveyAction}>Publish</Button></>:null}
        </div>
    );


}

export default  MultiSelect;