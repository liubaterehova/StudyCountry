const initialState = {
  "0": {
    error: "",
    listCountries: [],
    isCountriesLoading: false,
    country: null,
    weathers: [],
    isWeathersLoading: false,
    holidays: [],
    isHolidaysLoading: false
  }
};

export const processFailure = (state, { payload }) => ({
  ...state
});

export const getCountries = (state, { payload }) => {
  return {
    ...state,
    [payload.id]: { ...state[payload.id], isCountriesLoading: true }
  };
};

export const getCountriesSuccess = (state, { payload }) => {
  console.log("payloadinCountriesSaga", payload);
  const newObj = {
    ...state[payload.id],
    listCountries: payload.countries,
    isCountriesLoading: false
  };
  console.log("newObj", newObj);
  return {
    ...state,
    [payload.id]: {
      ...state[payload.id],
      listCountries: payload.countries,
      isCountriesLoading: false
    }
  };
};

export const getWeathers = (state, { payload }) => ({
  ...state,
  [payload.id]: {
    ...state[payload.id],
    isWeathersLoading: true
  }
});

export const getWeathersSuccess = (state, { payload }) => {
  return {
    ...state,
    [payload.id]: {
      ...state[payload.id],
      weathers: payload.weathers,
      isWeathersLoading: true
    }
  };
};

export const getHolidays = (state, { payload }) => ({
  ...state,
  [payload.id]: {
    ...state[payload.id],
    isHolidaysLoading: true
  }
});

export const getHolidaysSuccess = (state, { payload }) => {
  return {
    ...state,
    [payload.id]: {
      ...state[payload.id],
      holidays: payload.holidays,
      isHolidaysLoading: true
    }
  };
};

export const addNewTabInfo = (state, { payload }) => {
  return state;
};

export const addNewTabInfoSuccess = (state, { payload }) => {
  return {
    ...state,
    [payload.id]: {
      country: { ...payload.country }
    }
  };
};

export default initialState;
