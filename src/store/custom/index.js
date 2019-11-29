import { handleActions, createActions } from "redux-actions";

import initialState, * as handlers from "./handlers.jsx";

export const actions = createActions({
    PROCESS_FAILURE: undefined,
    GET_COUNTRIES: undefined,
    GET_COUNTRIES_SUCCESS: undefined,
    GET_WEATHERS: undefined,
    GET_WEATHERS_SUCCESS: undefined,
    GET_HOLIDAYS: undefined,
    GET_HOLIDAYS_SUCCESS: undefined,
    CLEAN_COUNTRIES: undefined,
    CLEAN_COUNTRIES_SUCCESS: undefined,
    CHANGE_ARR_OF_COUNTRIES: undefined,
    CHANGE_ARR_OF_COUNTRIES_SUCCESS: undefined,
    CHANGE_ARR_OF_SELECTED_COUNTRIES: undefined,
    CHANGE_ARR_OF_SELECTED_COUNTRIES_SUCCESS: undefined,

});


const customReducer = handleActions(
    new Map([
        [actions.processFailure, handlers.processFailure],
        [actions.getCountries, handlers.getCountries],
        [actions.getCountriesSuccess, handlers.getCountriesSuccess],
        [actions.getWeathers, handlers.getWeathers],
        [actions.getWeathersSuccess, handlers.getWeathersSuccess],
        [actions.getHolidays, handlers.getHolidays],
        [actions.getHolidaysSuccess, handlers.getHolidaysSuccess],
        [actions.cleanCountries, handlers.cleanCountries],
        [actions.cleanCountries, handlers.cleanCountriesSuccess],
        [actions.changeArrOfCountries, handlers.changeArrOfCountries],
        [actions.changeArrOfCountries, handlers.changeArrOfCountriesSuccess],
        [actions.changeArrOfSelectedCountries, handlers.changeArrOfSelectedCountries],
        [actions.changeArrOfSelectedCountries, handlers.changeArrOfSelectedCountriesSuccess],

    ]),
    initialState
);

export default customReducer;