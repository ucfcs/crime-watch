import * as t from './actionTypes';
import * as api from './api';

export function changeGender (user, gender)
{
    return (dispatch) =>
    {
        api.changeGender(user, gender, function (success, data, error) 
        {
            console.log("Here");
            if (success)
            {
                console.log("API call");
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


// auto assigning the phone number, will need to pass in the current users phone
<<<<<<< HEAD
export function getReports (phone = '4072277420')
{
    console.log("Waiting for reports");
    return (dispatch) =>
    {
        api.getReports(phone, function (success, reports)
        {
            if (success)
            {
                dispatch({type: t.GET_REPORTS, data: reports});
            }
            else
                console.log("error");
        });
    };
   
}

export function setLocation (phone = '4072277420')
{
    api.setLocation(phone, function ()
    {
       
=======
export function getReport (userPhoneNumber)
{
    console.log("Waiting for reports");
    api.getReport(userPhoneNumber, function (success, reports)
    {
        if (success)
            return reports;
        else
            console.log("error");
>>>>>>> 837a2372470937a2b2fc9a2c8e2300273b75aeac
    });
}

