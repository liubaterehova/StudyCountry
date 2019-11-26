import { handleActions, createActions } from "redux-actions";

import initialState, * as handlers from "./handlers.jsx";

export const actions = createActions({
    PROCESS_FAILURE: undefined,
    GET_COUNTRIES: undefined,
    GET_COUNTRIES_SUCCESS: undefined,
    GET_WEATHERS: undefined,
    GET_WEATHERS_SUCCESS: undefined,
    ON_HOLIDAYS: undefined,
    ON_HOLIDAYS_SUCCESS: undefined
});

const customReducer = handleActions(
    new Map([
        [actions.processFailure, handlers.processFailure],
        [actions.getCountries, handlers.getCountries],
        [actions.getCountriesSuccess, handlers.getCountriesSuccess],
        [actions.getWeathers, handlers.getWeathers],
        [actions.getWeathersSuccess, handlers.getWeathersSuccess],
        [actions.getHolidays, handlers.getHolidays],
        [actions.getHolidaysSuccess, handlers.getHolidaysSuccess]
    ]),
    initialState
);

export default customReducer;