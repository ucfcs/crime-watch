import { AsyncStorage } from 'react-native';
import * as t from './actionTypes';


let initialState = {};

const reducer = (state = initialState, action) =>
{
    switch (action.type) 
    {
        case t.CHANGE_GENDER:
            console.log("Attempting to update gender");
            return { ...state, gender: action.data};
        case t.CHANGE_PHONE:
            console.log("Attempting to update phone number");
            return { ...state, phone: action.data};
        default:
            return state;
    }
};

/**
 * Subscribing to the store makes it possible to
 * execute some code every time the state is updated.
 */


export default reducer;