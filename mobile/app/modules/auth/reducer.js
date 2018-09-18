import { AsyncStorage } from 'react-native';
import * as t from './actionTypes';

let initialState = { isLoggedIn: false, user: null, user: {} };

const reducer = (state = initialState, action) =>
{
    switch (action.type) 
    {
        case t.LOGGED_IN:
            const user = action.data;

            // Save the token data to Asynstorage
            AsyncStorage.multiSet([['user',JSON.stringify(user)]]);
            //return {...state, isLoggedIn: true, user: user };
            return {...state, isLoggedIn: true, ...user };
        case t.LOGGED_OUT:
            let keys = ['user'];
            AsyncStorage.multiRemove(keys);
            return {...state, isLoggedIn: false, user: null};
    
        case t.CHANGE_GENDER:
            console.log("Attempting to update gender");
            console.log(action.data);
            return { ...state, gender: action.data};

        case t.CHANGE_PHONE:
            console.log("Attempting to update phone number");
            return { ...state, phone: action.data};

        case t.UPDATE_REPORTS:
            console.log("Attempting to get reports");
            return { ...state, reports: action.data};

        default:
            return state;


    }
};

export default reducer;