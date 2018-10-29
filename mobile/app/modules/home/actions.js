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
        api.setLocation(deviceID, function (success, reports)
        {
            if (success)
            {
                console.log("Received new report");
                dispatch({type: t.ADD_REPORT, data: reports});
            }
            else
                console.log("No new reports detected");
                //console.log(reports);
        });
    };
}

export function searchListener (deviceID)
{
    console.log("Listening for search requests");
    api.searchListener(deviceID, function (success)
    {
        if (success)
        {

        }
        else
            console.log("Nothing new");
    });
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