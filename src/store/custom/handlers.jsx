const initialState = {
  isLoadingCountries: false,
  error: null,
  listCountries: [],
  tabs: {}
};

export const processFailure = (state, { payload }) => ({
  ...state,
  error: "Process Failure",
  isLoadingCountries: false
});

export const cleanCountries = (state, { payload }) => {
  return {
    ...state,
    isLoadingCountries: true
  };
};
export const cleanCountriesSuccess = (state, { payload }) => {
  return {
    ...state,
    listCountries: [],
    isLoadingCountries: false
  };
};
export const getCountries = (state, { payload }) => {
  return {
    ...state,
    isLoadingCountries: true
  };
};

export const getCountriesSuccess = (state, { payload }) => {
  return {
    ...state,
    isLoadingCountries: false,
    listCountries: payload.countries
  };
};

export const getWeathers = (state, { payload }) => ({
  ...state,
  isLoadingCountries: true
});

export const getWeathersSuccess = (state, { payload }) => {
  const sId = payload.id;
  let changedSelectedCountries = {
    ...state.tabs,
    [sId]: {
      ...state.tabs[sId],
      weathers: payload.weathers
    }
  };
  return {
    ...state,
    isLoadingCountries: false,
    tabs: changedSelectedCountries
  };
};

export const getHolidays = (state, { payload }) => ({
  ...state,
  isLoadingCountries: true
});

export const getHolidaysSuccess = (state, { payload }) => {
  return {
    ...state,
    isLoadingCountries: false,
    tabs: {
      ...state.tabs,
      [payload.id]: { ...state.tabs[payload.id], holidays: payload.holidays }
    }
  };
};

export const changeArrOfCountries = (state, { payload }) => {
  return {
    ...state,
    isLoadingCountries: true
  };
};

export const changeArrOfCountriesSuccess = (state, { payload }) => {
  return {
    ...state,
    isLoadingCountries: false,
    listCountries: payload
  };
};
export const changeArrOfSelectedCountries = (state, { payload }) => {
  return {
    ...state,
    isLoadingCountries: true
  };
};

export const changeArrOfSelectedCountriesSuccess = (state, { payload }) => {
  return {
    ...state,
    isLoadingCountries: false,
    tabs: {
      ...state.tabs,
      [payload.id]: payload.country
    }
  };
};

export default initialState;
