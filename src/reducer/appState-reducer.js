import {
  LOGIN_SUCCESS,
  LOADING,
  CAMPAIGN_FETCH_SUCCESS,
  DATA_FETCH_SUCCESS,
  FAILURE,
  CAMPAIGN_ADD_SUCCESS,
  CHANGE_THEME,
  LOGOUT,
} from "./dispatch-types";

export const initialState = {
  isLoading: false,
  error: "",
  theme: "green",
};

export function appStateReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    case DATA_FETCH_SUCCESS:
    case CAMPAIGN_FETCH_SUCCESS:
    case CAMPAIGN_ADD_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
      };
    case FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload || "Network Error",
      };
    case CHANGE_THEME:
      return {
        ...state,
        theme: action.theme,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
