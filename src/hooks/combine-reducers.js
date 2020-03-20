import { useReducer } from "react";
import {
  loginReducer,
  initialState as loginState
} from "../reducer/login-reducer";
import {
  userReducer,
  initialState as userState
} from "../reducer/user-reducer";
import {
  campaignReducer,
  initialState as campState
} from "../reducer/campaign-reducer";

export function combineReducers(reducers) {
  return (state = {}, action) => {
    const newState = {};
    for (let key in reducers) {
      newState[key] = reducers[key](state[key], action);
    }
    return newState;
  };
}

const combinedState = {
  login: loginState,
  user: userState,
  campaigns: campState
};

export function useCombinedReducer() {
  const [state, dispatch] = useReducer(
    combineReducers({
      login: loginReducer,
      user: userReducer,
      campaigns: campaignReducer
    }),
    combinedState
  );
  return [state, dispatch];
}
