import * as t from './actionTypes';
import * as api from './api';
import { auth } from "../../config/firebase";


export function changeGender(user, gender) 
{
    console.log("Attempting to change gender");
    return (dispatch) =>
    {
    	console.log("In return statement");
    	api.changeGender(user, gender, function (success, data, error)  
        {
        	if (success)
        	{
        		dispatch({type: t.GENDER_UPDATED, gender});
        		console.log("Success");
        	}
            
        });
    };
}

export const changeGender1 = (user, gender) => dispatch => {
	console.log("In return statement");
	api.changeGender(user, gender, function (success, data, error)  
    {
    	if (success)
    	{
    		dispatch({type: t.GENDER_UPDATED, gender});
    		console.log("Success");
    	}
        
    });
}
