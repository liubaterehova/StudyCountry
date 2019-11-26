const initialState = {
  isLoading: false,
  error: null,
  countries: [],
  weathers: []
};

export const processFailure = (state, { payload }) => ({
  ...state,
  error: "Process Failure"
});

export const getCountries = (state, { payload }) => {
  return {
    ...state,
    isLoading: true
  };
};

export const getCountriesSuccess = (state, { payload }) => {
  return {
    ...state,
    isLoading: false,
    countries: payload.countries
  };
};

export const getWeathers = (state, { payload }) => ({
  ...state,
  isLoading: true
});

export const getWeathersSuccess = (state, { payload }) => {
  console.log("stateinInitialState", state);
  console.log("handlersWeatherPayload", payload);
  return {
    ...state,
    isLoading: false,
    weathers: payload.weathers
  };
};

export const getHolidaysSuccess = (state, { payload }) => ({
  ...state,
  isLoading: false,
  holidays: payload.holidays
});

export const getHolidays = (state, { payload }) => ({
  ...state,
  isLoading: true
});

export default initialState;
