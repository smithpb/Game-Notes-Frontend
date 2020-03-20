import { FETCH_SUCCESS } from "./dispatch-types";

export const initialState = {
  rawList: []
};

export function kingdomReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SUCCESS:
      const { kingdoms } = action.payload;
      return {
        ...state,
        rawList: kingdoms.data
      };
    default:
      return state;
  }
}
