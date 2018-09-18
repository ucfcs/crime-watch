import * as t from './actionTypes';
import * as api from './api';
import { functions } from 'firebase';

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

export function getReportTypes(uid)
{
    var reportTypes = [];
    api.getReports(uid, function (success, reports)
    {
        if (success)
        {
            reports.forEach(function (report) {
                reportTypes.push(report.val().type);
            });
            return reports;
        }
        else
            console.log(reports);
    })
}

export function getReports(uid)
{
    return (dispatch) => {
        api.getReports(uid, function (success, reports)
        {
            if (success)
            {
                dispatch({type: t.UPDATE_REPORTS, reports: reports});
            }
            else
                console.log(reports);
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
            console.log(report);
            return report;
        }
        else
            console.log("error");
    });
}