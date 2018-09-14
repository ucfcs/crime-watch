import { AsyncStorage } from 'react-native';
import * as t from './actionTypes';

let initialState = { Gender: null, user: null };

const homeReducer = (state = initialState, action) =>
{
    switch (action.type) 
    {
        case t.GENDER_UPDATED:
            console.log("In home reducer");
            var user = AsyncStorage.getItem('user');
            user.gender = action.data;

            // Save the token data to Asynstorage
            AsyncStorage.setItem([['user',user]]);

            return {...state, user: user};
        
        case t.LOGGED_OUT:
            let keys = ['user'];
            AsyncStorage.multiRemove(keys);
            
            return {...state, isLoggedIn: false, user: null};

        default:
            return state;
    }
};

export default homeReducer;