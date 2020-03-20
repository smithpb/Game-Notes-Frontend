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
import {
  kingdomReducer,
  initialState as kingState
} from "../reducer/kingdom-reducer";
import {
  locationReducer,
  initialState as locState
} from "../reducer/location-reducer";
import {
  characterReducer,
  initialState as charState
} from "../reducer/character-reducer";
import {
  noteReducer,
  initialState as noteState
} from "../reducer/note-reducer";

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
  campaigns: campState,
  kingdoms: kingState,
  locations: locState,
  characters: charState,
  notes: noteState
};

export function useCombinedReducer() {
  const [state, dispatch] = useReducer(
    combineReducers({
      login: loginReducer,
      user: userReducer,
      campaigns: campaignReducer,
      kingdoms: kingdomReducer,
      locations: locationReducer,
      characters: characterReducer,
      notes: noteReducer
    }),
    combinedState
  );
  return [state, dispatch];
}
