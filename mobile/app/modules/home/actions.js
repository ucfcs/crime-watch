import * as t from './actionTypes';
import * as api from './api';


export function changeGender (user, gender)
{
    return (dispatch) =>
    {
        api.changeGender(user, gender, function (success, data, error) 
        {
            if (success)
            {
                dispatch({type: t.CHANGE_GENDER, data: gender});
                console.log("State change done");
            }
            else if (error)
                console.log("error");
        });
    };
}

export function changePhone (user, phone)
{
    return (dispatch) =>
    {
        api.changePhone(user, phone, function (success, data, error) 
        {
            if (success)
            {
                dispatch({type: t.CHANGE_PHONE, data: phone});
                console.log("State change done");
            }
            else if (error)
                console.log("error");
        });
    };
}

