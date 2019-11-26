import { actions as types } from "./index";
import { all, put, call, take, takeEvery } from "redux-saga/effects";
import makeApi from "../../api";

function* getCountriesSaga({ payload }) {
    try {
        let response;
        const custom = makeApi().custom;
        response = yield call([custom, custom.getCountries]);

        if (response.data) {
            yield put(types.getCountriesSuccess({ countries: response.data }));
        }
    } catch (error) {
        yield put(types.processFailure({ error }));
    }
}

// function* getHolidaysSaga({ payload }) {
//     yield put(types.getHolidaysSuccess(payload));
// }

function* getWeathersSaga({ payload }) {
    try {
        console.log("getWeathersSaga", payload);
        let response;
        const custom = makeApi().custom;
        response = yield call([custom, custom.getWeather, "london"]);

        if (response.data) {
            console.log("response.dataWeathers", response.data);
            yield put(types.getWeathersSuccess({ weathers: response.data }));
        }
    } catch (error) {
        console.log("error");
        yield put(types.processFailure({ error }));
    }
}

const customSagas = [
    takeEvery(types.getCountries, getCountriesSaga),
    // takeEvery(types.getHolidays, getHolidaysSaga),
    takeEvery(types.getWeathers, getWeathersSaga)
];

export default customSagas;