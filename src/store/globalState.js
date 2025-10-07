import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalVisible: false,
  dataModel: false,
  user: null,
  isAuthenticated: false,
  token: '',
  user: '',
  netWorkSettings: [],
  dataPlans: [],
  contact: {},
  airtimeNetWorkStatus: {},
  dataNetworkStatus: {},
  siteSettings: {},
  hasShowNotification: false,
};

const globalSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.isModalVisible = state.isModalVisible ? false : true;
    },
    toggleDataModel: (state) => {
      state.dataModel = state.dataModel ? false : true;
    },
    loginUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.data;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    useContact: (state, action) => {
      state.contact = action.payload;
    },
    setContact: (state, action) => {
      state.netWorkSettings = action.payload;
    },
    setDataPlans: (state, action) => {
      state.dataPlans = action.payload;
    },
    setContactNumber: (state, action) => {
      state.contact = action.payload;
    },
    resetContactNumber: (state) => {
      state.contact = {};
    },
    setAirtimeNetwork: (state, action) => {
      state.airtimeNetWorkStatus = action.payload;
    },
    setDataNetwork: (state, action) => {
      state.dataNetworkStatus = action.payload;
    },
    saveSiteSettings: (state, action) => {
      state.siteSettings = action.payload;
    },
    setHasShowNotification: (state, action) => {
      state.hasShowNotification = true;
    },
  },
});

export const {
  toggleModal,
  toggleDataModel,
  loginUser,
  logout,
  useContact,
  setContact,
  setDataPlans,
  resetContactNumber,
  setContactNumber,
  setAirtimeNetwork,
  setDataNetwork,
  saveSiteSettings,
  setHasShowNotification,
} = globalSlice.actions;
export default globalSlice.reducer;
