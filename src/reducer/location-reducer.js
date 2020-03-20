import { FETCH_SUCCESS } from "./dispatch-types";

export const initialState = {
  rawList: []
};

export function locationReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SUCCESS:
      const { locations } = action.payload;
      return {
        ...state,
        rawList: locations.data
      };
    default:
      return state;
  }
}
