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

export function changeAlexaCode (user, alexaCode)
{
    return (dispatch) =>
    {
        api.changeAlexaCode(user, alexaCode, function (success, data, error)
        {
            if (success)
            {
                dispatch({type: t.CHANGE_ALEXA_CODE, data: alexaCode});
                console.log("ALEXA CODE CHANGED:")
                console.log(alexaCode);
            }
            else if (error)
                console.log("error: " + error.message);
        });
    };
}

// auto assigning the phone number, will need to pass in the current users phone
export function getReport (phone = '4072277420')
{
    console.log("Waiting for reports");
    api.getReport(phone, function (success, report)
    {
        if (success)
        {
            //dispatch({type: t.DATA_RECEIVED, data: report})


            // go to the most recent report and look to see if the location field is filled in
            //console.log(report);

            return report;
        }
        else
            console.log("error");
    });
}

