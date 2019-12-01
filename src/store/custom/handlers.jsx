const makeTab = () => {
  return {
    error: "",
    listCountries: [],
    isCountriesLoading: false,
    country: null,
    weathers: [],
    isWeathersLoading: false,
    holidays: [],
    isHolidaysLoading: false
  };
};

const initialState = [makeTab()];

export const processFailure = (state, { payload }) => [...state];

export const getCountries = (state, { payload }) => {
  return [
    ...state.slice(0, payload.id),
    { ...state[payload.id], isCountriesLoading: true },
    ...state.slice(payload.id + 1)
  ];
};

export const removeTab = (state, { payload }) => {
  const { id } = payload;
  return [...state.slice(0, id), ...state.slice(id + 1)];
};

export const addTab = (state, { payload }) => {
  return [...state, makeTab()];
};

export const getCountriesSuccess = (state, { payload }) => {
  return [
    ...state.slice(0, payload.id),
    {
      ...state[payload.id],
      listCountries: payload.countries,
      isCountriesLoading: false
    },
    ...state.slice(payload.id + 1)
  ];
};

export const getWeathers = (state, { payload }) => [
  ...state.slice(0, payload.id),
  {
    ...state[payload.id],
    isWeathersLoading: true
  },
  ...state.slice(payload.id + 1)
];

export const getWeathersSuccess = (state, { payload }) => {
  return [
    ...state.slice(0, payload.id),
    {
      ...state[payload.id],
      weathers: payload.weathers,
      isWeathersLoading: false
    },
    ...state.slice(payload.id + 1)
  ];
};

export const getHolidays = (state, { payload }) => [
  ...state.slice(0, payload.id),
  {
    ...state[payload.id],
    isHolidaysLoading: true
  },
  ...state.slice(payload.id + 1)
];

export const getHolidaysSuccess = (state, { payload }) => {
  return [
    ...state.slice(0, payload.id),
    {
      ...state[payload.id],
      holidays: payload.holidays,
      isHolidaysLoading: false
    },
    ...state.slice(payload.id + 1)
  ];
};

export const addNewTabInfo = (state, { payload }) => {
  return state;
};

export const addNewTabInfoSuccess = (state, { payload }) => {
  return [
    ...state.slice(0, payload.id),
    {
      ...state[payload.id],
      country: { ...payload.country }
    },
    ...state.slice(payload.id + 1)
  ];
};

export default initialState;
