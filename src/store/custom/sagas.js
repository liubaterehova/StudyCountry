import { actions as types } from "./index";
import { put, call, takeEvery } from "redux-saga/effects";
import makeApi from "../../api";


const filterCountriesByName = (countries, value) => {
    const arrOfObj = [];
    for (let obj of countries) {
        if (obj.name.toLowerCase().includes(value.toLowerCase())) {
            arrOfObj.push(obj);
        }
    }
    return arrOfObj;
};

function* getCountriesSaga({ payload }) {
    try {
        let response;
        const custom = makeApi().custom;
        response = yield call([custom, custom.getCountries], payload);

        if (response.data) {
            // payload - это value , которое мы ввели
            //response.data -это ответ от сервера

            yield put(types.getCountriesSuccess({ countries: filterCountriesByName(response.data, payload), }));
        }
    } catch (error) {

        console.log('error in getCountriesSaga');
        yield put(types.processFailure({ error }));
    }
}

function* changeArrOfSelectedCountriesSaga({ payload }) {
    console.log('payloadChangeSelectedCountries', payload);
    yield put(types.changeArrOfSelectedCountriesSuccess(payload));
}

// function* getHolidaysSaga({ payload }) {
//     yield put(types.getHolidaysSuccess(payload));
// }

function* getWeathersSaga({ payload }) {
    try {
        console.log("getWeathersSaga", payload);
        let response;
        const custom = makeApi().custom;
        response = yield call([custom, custom.getWeather], payload);

        if (response.data) {
            console.log("response.dataWeathers", response.data);
            yield put(types.getWeathersSuccess({ weathers: response.data.consolidated_weather }));
        }
    } catch (error) {
        console.log("error", error);
        yield put(types.processFailure({ error }));
    }
}


function* changeArrOfCountriesSaga({ payload }) {
    console.log('payloadChange', payload);
    yield put(types.changeArrOfCountriesSuccess(payload));
}




function* cleanCountriesSaga({ payload }) {
    yield put(types.cleanCountriesSuccess(payload));
}
const customSagas = [
    takeEvery(types.getCountries, getCountriesSaga),
    // takeEvery(types.getHolidays, getHolidaysSaga),
    takeEvery(types.getWeathers, getWeathersSaga),
    takeEvery(types.cleanCountries, cleanCountriesSaga),
    takeEvery(types.changeArrOfCountries, changeArrOfCountriesSaga),
    takeEvery(types.changeArrOfSelectedCountries, changeArrOfSelectedCountriesSaga),
];

export default customSagas;