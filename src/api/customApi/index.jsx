import {
  BASE_COUNTRIES_URL,
  BASE_WEATHER_URL,
  BASE_HOLIDAYS_URL
} from "../index";

import axios from "axios";

const http = axios.create();

const makeCustomApi = ({ client, headersManager }) => ({
  getCountries: () => http.get(`${BASE_COUNTRIES_URL}`),
  getWeathers: () => http.get(`${BASE_WEATHER_URL}`),
  getHolidays: () => http.get(`${BASE_HOLIDAYS_URL}`)
});

export default makeCustomApi;
