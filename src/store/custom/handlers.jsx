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

export const cleanCountries = (state, { payload }) => {
  console.log("cleanCountries");
  return {
    ...state
  };
};
export const cleanCountriesSuccess = (state, { payload }) => {
  console.log("cleanCountries", state);
  return {
    ...state,
    countries: []
  };
};
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
// export const changeArrOfCountriesSuccess = (state, { payload }) => ({
//   ...state,
//   isLoading: false,
//   countries: payload.countries
// });
export const changeArrOfCountries = (state, { payload }) => {
  return {
    ...state,
    isLoading: true
  };
};

export const changeArrOfCountriesSuccess = (state, { payload }) => {
  console.log("end payloadSuccessPayload", payload);
  return {
    ...state,
    isLoading: false,
    countries: payload
  };
};

export default initialState;
