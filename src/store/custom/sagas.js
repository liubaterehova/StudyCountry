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

        yield put(types.processFailure({ error }));
    }
}

function* changeArrOfSelectedCountriesSaga({ payload, ...test }) {
    yield put(types.changeArrOfSelectedCountriesSuccess(payload));
}



function* getWeathersSaga({ payload }) {
    try {

        let response;
        const custom = makeApi().custom;
        response = yield call([custom, custom.getWeather], payload.country);

        if (response.data) {
            yield put(types.getWeathersSuccess({
                weathers: response.data.consolidated_weather,
                id: payload.id
            }));
        }
    } catch (error) {

        yield put(types.processFailure({ error }));
    }
}

function* getHolidaysSaga({ payload }) {
    try {
        console.log('HolidaySaga');
        const custom = makeApi().custom;
        let response = yield call([custom, custom.getHolidays], payload.country);
        console.log(response);
        console.log('response');


        if (response.data) {
            console.log('responseinHolidays', response.data)
            console.group('response.holiday', response.data.holidays)
            yield put(types.getHolidaysSuccess({
                holidays: response.data.holidays,
                id: payload.id
            }));
        }
    } catch (error) {
        console.log('errorinHolidaySaga');
        yield put(types.processFailure({ error }));
    }

}


function* changeArrOfCountriesSaga({ payload }) {
    yield put(types.changeArrOfCountriesSuccess(payload));
}




function* cleanCountriesSaga({ payload }) {
    yield put(types.cleanCountriesSuccess(payload));
}
const customSagas = [
    takeEvery(types.getCountries, getCountriesSaga),
    takeEvery(types.getHolidays, getHolidaysSaga),
    takeEvery(types.getWeathers, getWeathersSaga),
    takeEvery(types.cleanCountries, cleanCountriesSaga),
    takeEvery(types.changeArrOfCountries, changeArrOfCountriesSaga),
    takeEvery(types.changeArrOfSelectedCountries, changeArrOfSelectedCountriesSaga),
];

export default customSagas;