import { FETCH_SUCCESS } from "./dispatch-types";

export const initialState = {
  rawList: []
};

export function noteReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SUCCESS:
      const { notes } = action.payload;
      return {
        ...state,
        rawList: notes.data
      };
    default:
      return state;
  }
}
