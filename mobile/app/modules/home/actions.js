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

export function setLocation (uid, deviceID)
{
    api.setLocation(deviceID, function (success, reports)
    {
        if (success)
            console.log("Success");
        else
            console.log("Error");
    });
}

export function searchListener (deviceID)
{
    api.searchListener(deviceID, function (success, data)
    {
        
    });
}

// auto assigning the phone number, will need to pass in the current users phone
export function getReport (deviceID)
{
    console.log("Waiting for reports");

    return (dispatch) =>
    {
        api.getReport(deviceID, function (success, report)
        {
            if (success)
                dispatch({type: t.ADD_REPORT, data: report});
            else
                console.log("error");
        });
    }
}