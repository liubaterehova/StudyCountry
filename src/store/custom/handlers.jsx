const initialState = {
  isLoading: false,
  error: null,
  countries: [],
  weathers: [],
  holidays: []
};

export const processFailure = (state, { payload }) => ({
  ...state,
  error: "Process Failure"
});

export const getCountries = (state, { payload }) => {
  console.log("getCountries", payload);
  return {
    ...state,
    isLoading: true
  };
};

export const getCoutriesSuccess = (state, { payload }) => {
  console.log("stateinInitialState", state);
  console.log("payload.countries", payload.countries);
  return {
    ...state,
    isLoading: false,
    countries: payload.countries
  };
};
export const getWeathersSuccess = (state, { payload }) => ({
  ...state,
  isLoading: false,
  weathers: payload.weathers
});

export const getWeathers = (state, { payload }) => ({
  ...state,
  isLoading: true
});

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
