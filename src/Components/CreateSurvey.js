import React, { useEffect, useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import MultiSelect from './MultiSelect';
import SingleSelect from './SingleSelect';
import './css/input.css';
import { useLocation, useParams,useHistory } from 'react-router-dom';


function CreateSurvey(props){
    
    

    const query=useLocation().search;
    console.log(query);
    const history=useHistory();
    const{surveyId}=useParams();
    const [dropdownOpen, setOpen] = useState(false);
    const toggle = () => setOpen(!dropdownOpen);
    const [option,setOption]=useState("Select Question Type");

    useEffect(()=>{
        
        
        if(query==="?clear=true"){
            
            setOption("Select Question Type");
            history.push(`/createsurvey/${surveyId}`);
            
        }
       

    },[query]);


    return(
    <>
    <p>Survey ID{surveyId}</p>
        <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret className="dropdown-style">
            {option}
        </DropdownToggle>
        <DropdownMenu>
            <DropdownItem className="menu-item" onClick={()=>setOption("Multi Select")}>Multi Select</DropdownItem>
            <DropdownItem className="menu-item" onClick={()=>setOption("Single Select")}>Single Select</DropdownItem>
        </DropdownMenu>
        </ButtonDropdown>  

        {option==="Multi Select"?<MultiSelect/>:null}
        {option==="Single Select"?<SingleSelect/>:null}
    </>);
}

export default CreateSurvey;