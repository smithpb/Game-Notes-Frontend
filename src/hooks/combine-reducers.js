import { useReducer } from "react";
import {
  loginReducer,
  initialState as loginState
} from "../reducer/login-reducer";
import {
  userReducer,
  initialState as userState
} from "../reducer/user-reducer";

export function combineReducers(reducers) {
  return (state = {}, action) => {
    const newState = {};
    for (let key in reducers) {
      newState[key] = reducers[key](state[key], action);
    }
    return newState;
  };
}

// const combinedState = {
//   login: loginState,
//   user: userState
// };

const combinedState = {
  login: loginState,
  user: userState
};

export function useCombinedReducer() {
  const [state, dispatch] = useReducer(
    combineReducers({
      login: loginReducer,
      user: userReducer
    }),
    combinedState
  );
  return [state, dispatch];
}
