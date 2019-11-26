import { actions as types } from "./index";
import { all, put, call, take, takeEvery } from "redux-saga/effects";
import makeApi from "../../api";

function* getCountriesSaga({ payload }) {
    try {
        let response;
        const custom = makeApi().custom;
        response = yield call([custom, custom.getCountries]);

        if (response.data) {
            console.log("response.data", response.data);
            yield put(types.getCountriesSuccess({ countries: response.data }));
        }
    } catch (error) {
        yield put(types.processFailure({ error }));
    }
}

// function* getHolidaysSaga({ payload }) {
//     yield put(types.getHolidaysSuccess(payload));
// }

// function* getWeathersSaga({ payload }) {
//     yield put(types.getWeathersSuccess(payload));
// }

const customSagas = [
    takeEvery(types.getCountries, getCountriesSaga)
    // takeEvery(types.getHolidays, getHolidaysSaga),
    // takeEvery(types.getWeathers, getWeathersSaga)
];

export default customSagas;