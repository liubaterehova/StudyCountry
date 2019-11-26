import {
  BASE_COUNTRIES_URL,
  BASE_WEATHER_URL,
  BASE_HOLIDAYS_URL
} from "../index";

import axios from "axios";

const http = axios.create();

const makeCustomApi = ({ client, headersManager }) => ({
  getCountries: () => http.get(`${BASE_COUNTRIES_URL}`),
  getWeather: async city => {
    const searchResult = await http.get(`${BASE_WEATHER_URL}location/search`, {
      headers: {
        "Access-Control-Allow-Origin": "https://www.metaweather.com/api"
      },
      params: { query: "london" }
    });

    const woeid = searchResult.data[0].woeid;

    return http.get(`${BASE_COUNTRIES_URL}location/${woeid}`);
  },
  getHolidays: () => http.get(`${BASE_HOLIDAYS_URL}`)
});

export default makeCustomApi;
