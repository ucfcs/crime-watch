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

export function setLocation (deviceID)
{
    console.log("Waiting on a new user report");
    return (dispatch) =>
    {
        if (deviceID && deviceID != "")
        {
            api.setLocation(deviceID, function (success, reports)
            {
                if (success)
                {
                    console.log("Received new report");
                    dispatch({type: t.ADD_REPORT, data: reports});
                }
                else
                    console.log("Error in setLocation:");
                    console.log(reports);
            });
        }
        else
            console.log("setLocation: DeviceID was null/undefined or empty");
    };
}

export function searchListener (deviceID)
{
    console.log("Listening for search requests");
    if (deviceID && deviceID != "")
    {
        api.searchListener(deviceID, function (success)
        {
            if (success)
            {

            }
            else
                console.log("Nothing new");
                
            });
    }
    else
        console.log("searchListener: DeviceID was null/undefined or empty");
}

export function getReports ()
{
    console.log("Waiting for ALL reports");

    return dispatch => 
    {
        api.getReports( function (success, reports)
        {
            if (success)
                dispatch({type: t.ALL_REPORTS, data: reports});
            else
                console.log("error");
        });
    }
}