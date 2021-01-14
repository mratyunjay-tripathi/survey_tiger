

import {useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {Button} from 'reactstrap';
import { surveySlice } from '../Store/SurveySlice';

function Confirm(){

    const {surveyId}=useParams();
    const dispatch=useDispatch();
    const history=useHistory();


    const survey=useSelector((globalStore)=>(
        globalStore.surveys.filter((s)=>s.surveyId===surveyId)
    ));

    const PublishSurveyAction=()=>{
        const payload={
            surveyId
        }

        dispatch(surveySlice.actions.publishSurvey(payload));
        history.push("/");
    }

    console.log("inside condirm",survey);
    
    return (
        <>

        {survey[0].questions.map((q,index)=> (
            <div key={index}>
            <h5>{q.question}</h5>
            {q.type==="single"?
            <>
            <div>
            <input type="radio"></input>
            <span>{q.options[0]}</span>
            
            <input type="radio"></input>
            <span>{q.options[1]}</span>
            </div>
            </>:
            <>
            <div>
            <input type="checkbox"></input>
            <span>{q.options[0]}</span>
            </div>
            <div>
            <input type="checkbox"></input>
            <span>{q.options[1]}</span>
            </div>
            <div>
            <input type="checkbox"></input>
            <span>{q.options[2]}</span>
            </div>
            <div>
            <input type="checkbox"></input>
            <span>{q.options[3]}</span>
            </div>
            </>}
            <br></br>
            </div>
        ))
        }  

         <Button  className="btn-main" onClick={PublishSurveyAction}>Confirm </Button>
 
        </>

    );
}
export default Confirm;