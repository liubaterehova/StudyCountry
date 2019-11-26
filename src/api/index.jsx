import makeCustomApi from "./customApi";
import config from "../config";

export const BASE_COUNTRIES_URL = "https://restcountries.eu/rest/v2/";
export const BASE_WEATHER_URL = "https://static/img/weather/";
export const BASE_HOLIDAYS_URL = `http://developers.ria.com/states?api_key=${config.apiKey}`;

export const makeApi = (dependencies = {}) => ({
  custom: makeCustomApi(dependencies)
});

export default makeApi;
