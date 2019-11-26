import makeCustomApi from "./customApi";

export const BASE_COUNTRIES_URL = "https://restcountries.eu/rest/v2/";
export const BASE_WEATHER_URL = "https://www.metaweather.com/api/";
export const BASE_HOLIDAYS_URL = "https://holidayapi.com/v1/holidays";

export const makeApi = (dependencies = {}) => ({
  custom: makeCustomApi(dependencies)
});

export default makeApi;
