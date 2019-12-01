import { actions } from "./index";
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
        console.log('payloadInCountriesSaga', payload)
        response = yield call([custom, custom.getCountries], payload.value);
        console.log('responseInCountruesSaga', response.data)
        if (response.data) {
            // payload - это value , которое мы ввели
            //response.data -это ответ от сервера

            yield put(actions.getCountriesSuccess({
                countries: filterCountriesByName(response.data, payload.value),
                id: payload.id
            }));
        }
    } catch (error) {
        yield put(actions.processFailure({ error }));
    }
}

function* addNewTabInfoSaga({ payload }) {
    yield put(actions.addNewTabInfoSuccess({
        id: payload.id,
        country: payload.country
    }));
}

function* getWeathersSaga({ payload }) {
    try {

        let response;
        const custom = makeApi().custom;
        response = yield call([custom, custom.getWeather], payload.country);

        if (response.data) {
            yield put(actions.getWeathersSuccess({
                weathers: response.data.consolidated_weather,
                id: payload.id
            }));
        }
    } catch (error) {

        yield put(actions.processFailure({ error }));
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
            yield put(actions.getHolidaysSuccess({
                holidays: response.data.holidays,
                id: payload.id
            }));
        }
    } catch (error) {
        console.log('errorinHolidaySaga');
        yield put(actions.processFailure({ error }));
    }

}




const customSagas = [
    takeEvery(actions.getCountries, getCountriesSaga),
    takeEvery(actions.getHolidays, getHolidaysSaga),
    takeEvery(actions.getWeathers, getWeathersSaga),
    takeEvery(actions.addNewTabInfo, addNewTabInfoSaga),
];

export default customSagas;