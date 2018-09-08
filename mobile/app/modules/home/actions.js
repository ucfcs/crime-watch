import * as t from './actionTypes';
import * as api from './api';
import { auth } from "../../config/firebase";


export function changeGender(user, gender) 
{
    console.log("Attempting to gender change");
  
        api.changeGender(user, gender, function () 
        {
            console.log("Success");
        });
   
}



