import { FETCH_SUCCESS } from "./dispatch-types";

export const initialState = {
  rawList: []
};

export function characterReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SUCCESS:
      const { characters } = action.payload;
      return {
        ...state,
        rawList: characters.data
      };
    default:
      return state;
  }
}
