import {
  DATA_FETCH_SUCCESS,
  LOGOUT,
  FILTER_NOTES,
  ADD_NOTE,
} from "./dispatch-types";
// import { filterByCampaign } from "../util/misc";

export const initialState = {
  rawList: [],
  displayList: [],
};

export function noteReducer(state = initialState, action) {
  switch (action.type) {
    case DATA_FETCH_SUCCESS:
      const { notes } = action.payload;
      return {
        ...state,
        displayList: notes.data,
        rawList: notes.data,
      };
    case ADD_NOTE:
      return {
        ...state,
        rawList: [action.payload, ...state.rawList],
      };
    case FILTER_NOTES:
      return {
        ...state,
        displayList: action.payload,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
