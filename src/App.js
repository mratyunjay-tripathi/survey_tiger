import logo from './logo_new.png';
import './App.css';
import {Button} from 'reactstrap';
import {BrowserRouter, Link, Route,Switch, useHistory} from "react-router-dom";
import CreateSurvey from './Components/CreateSurvey.js';
import TakeSurvey from './Components/TakeSurvey.js';
import Confirm from './Components/Confirm';
import { useDispatch } from 'react-redux';
import{createSurvey,surveySlice} from './Store/SurveySlice';
import { unwrapResult } from '@reduxjs/toolkit';


function App() {
  const dispatch=useDispatch();
  const history=useHistory();

  const dispatchAction=()=>{
    
    const res=dispatch(createSurvey());
     res.then(unwrapResult).then((surveyId)=>history.push("/createsurvey/"+surveyId));
  }


  return (
    
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
     
      <div className="body">
      <Switch>
          <Route path="/createsurvey/:surveyId"><CreateSurvey/></Route>
          <Route path="/takesurvey"><TakeSurvey/></Route>
          <Route path="/confirm/:surveyId"><Confirm/></Route>
          
          <Route path="/">
          <Link className="link" to="/createsurvey">
          <Button className="btn-main" onClick={dispatchAction}>Create Survey</Button>
         </Link>
          <Link className="link" to="/takesurvey">
          <Button className="btn-main">Take Survey</Button>
          </Link>
        </Route>

        </Switch>
        

      </div>
      
    </div>
    
  );
}

export default App;
