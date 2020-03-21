import {
  LOGIN_SUCCESS,
  LOADING,
  LOGIN_FAILURE,
  LOGIN_INPUT,
  FETCH_SUCCESS
} from "./dispatch-types";

export const initialState = {
  username: "",
  password: "",
  isLoading: false,
  error: ""
};

export function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_INPUT: {
      return {
        ...state,
        [action.field]: action.payload
      };
    }
    case LOADING: {
      return {
        ...state,
        isLoading: true,
        error: ""
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        username: "",
        password: "",
        isLoading: false,
        error: ""
      };
    }
    case LOGIN_FAILURE: {
      return {
        ...state,
        username: "",
        password: "",
        isLoading: false,
        error: action.payload
      };
    }
    case FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
}
