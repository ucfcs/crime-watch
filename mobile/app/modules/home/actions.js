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
        api.changePhone(user, phone, function (success, phone, error) 
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
    return (dispatch) =>
    {
        api.setLocation(uid, deviceID, function (success, reports)
        {
            if (success)
            {
                //console.log("Received new report");
                //console.log(reports);
                dispatch({type: t.ADD_REPORT, data: reports});
            }
            else
                console.log("Error");
        });
    };
}

export function searchListener (deviceID)
{
    api.searchListener(deviceID, function (success)
    {
        
    });
}

export function getReports ()
{
    console.log("Waiting for reports");

   // return (dispatch) =>
    //{
        api.getReport(deviceID, function (success, reports)
        {
            if (success)
                return reports;
            else
                console.log("error");
        });
    //}
}