import {
  BASE_COUNTRIES_URL,
  BASE_WEATHER_URL,
  BASE_HOLIDAYS_URL
} from "../index";

import config from "../../config";
import axios from "axios";

const http = axios.create();

function getPreviousYear() {
  const year = new Date().getFullYear() - 1;
  return year;
}

const makeCustomApi = ({ client, headersManager }) => ({
  getCountries: async value => {
    console.log("city", value);
    console.log(http.get(`${BASE_COUNTRIES_URL}${value}`));
    return await http.get(`${BASE_COUNTRIES_URL}${value}`);
  },

  getWeather: async city => {
    const searchResult = await http.get(
      `https://cors-anywhere.herokuapp.com/${BASE_WEATHER_URL}location/search`,
      {
        params: { query: city }
      }
    );

    const woeid = searchResult.data[0].woeid;
    console.log("woeid", woeid);

    return http.get(
      `https://cors-anywhere.herokuapp.com/${BASE_WEATHER_URL}location/${woeid}`
    );
  },
  getHolidays: country => {
    console.log("inApiCountry", country);
    http.get(`${BASE_HOLIDAYS_URL}`, {
      params: { key: config.apiKey, country: country, year: getPreviousYear() }
    });
  }
});

export default makeCustomApi;
