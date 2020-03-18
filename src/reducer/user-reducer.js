import { LOGIN_SUCCESS, LOGIN_FAILURE } from "./dispatch-types";

export const initialState = {
  jwt: "",
  username: "",
  user_id: ""
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        jwt: action.payload.token,
        username: action.payload.user.username,
        user_id: action.payload.user.id
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        ...initialState
      };
    default:
      return state;
  }
}
