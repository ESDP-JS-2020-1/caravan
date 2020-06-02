import {SET_LANGUAGE_SUCCESS} from "./actionsTypes";


export const setLanguageSuccess = name => ({type: SET_LANGUAGE_SUCCESS, name});

export const setLanguage = name => dispatch => {
    try {
        dispatch(setLanguageSuccess(name))
    } catch (e) {
        console.log(e);
    }
};