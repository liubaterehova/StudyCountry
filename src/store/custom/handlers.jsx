const initialState = {
  isLoading: false,
  error: null,
  countries: [],
  weathers: [],
  selectedCountries: []
};

export const processFailure = (state, { payload }) => ({
  ...state,
  error: "Process Failure",
  isLoading: false
});

export const cleanCountries = (state, { payload }) => {
  console.log("cleanCountries");
  return {
    ...state,
    isLoading: true
  };
};
export const cleanCountriesSuccess = (state, { payload }) => {
  console.log("cleanCountries", state);
  return {
    ...state,
    countries: [],
    isLoading: false
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
export const changeArrOfSelectedCountries = (state, { payload }) => {
  return {
    ...state,
    isLoading: true
  };
};

export const changeArrOfSelectedCountriesSuccess = (state, { payload }) => {
  console.log("payloadSelectedArrPayload", payload);
  console.log("initialState.selectedCountries", initialState.selectedCountries);
  return {
    ...state,
    isLoading: false,
    selectedCountries: [...state.selectedCountries, payload]
  };
};

export default initialState;
