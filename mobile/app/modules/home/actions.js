import * as t from './actionTypes';
import * as api from './api';
import { auth } from "../../config/firebase";

import { AsyncStorage } from 'react-native';

export function getUserInfo (callback)
{
    return (dispatch) =>
    {
        api.getUser(user, function (success, data, error)
        {

        });
    };
}


