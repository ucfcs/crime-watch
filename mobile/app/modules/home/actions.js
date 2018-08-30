import * as t from './actionTypes';
import * as api from './api';
import { auth } from "../../config/firebase";

import { AsyncStorage } from 'react-native';


export function displayReports (user, successCB, errorCB)
{
    return (dispatch) => 
      {
          api.userReports(user, function (success, error, data) 
          {
              if (success) 
              {
                  dispatch({type: t.LOGGED_IN}, data);
                  successCB(user);
              }
              else if (error) 
                  errorCB(error)
          });
      };
}

