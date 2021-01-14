
import {useSelector} from 'react-redux';
import {Button} from 'reactstrap';

function TakeSurvey(){
    const surveyId=useSelector((globalStore)=>(
        globalStore.surveys.filter((s)=>s.isPublished).map((s)=>s.surveyId)
    ));

    console.log(surveyId);
    
    return (
        <>
        
        {surveyId.map((id)=>{
         return   <Button key={id} className="btn-main">Take Survey {id} </Button>
        })
        }
        </>

    );
}
export default TakeSurvey;