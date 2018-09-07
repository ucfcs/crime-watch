import { AsyncStorage } from 'react-native';
import * as t from './actionTypes';

let initialState = { isLoggedIn: false, user: null };

const homeReducer = (state = initialState, action) =>
{
    switch (action.type) 
    {
        case t.LOGGED_IN:
            const user = action.data;

            // Save the token data to Asynstorage
            AsyncStorage.multiSet([['user',JSON.stringify(user)]]);

            return {...state, isLoggedIn: true, user: user };
        
        case t.LOGGED_OUT:
            let keys = ['user'];
            AsyncStorage.multiRemove(keys);
            
            return {...state, isLoggedIn: false, user: null};

        default:
            return state;
    }
};

export default homeReducer;