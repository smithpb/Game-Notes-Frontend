import {
  LOGIN_SUCCESS,
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_INPUT
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
    case LOGIN: {
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
    default:
      return state;
  }
}
