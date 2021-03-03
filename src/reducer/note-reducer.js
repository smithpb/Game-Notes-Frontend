import {
  FETCH_SUCCESS,
  CAMPAIGN_SORT,
  LOGOUT,
  FILTER_NOTES,
} from "./dispatch-types";
import { filterByCampaign } from "../util/misc";

export const initialState = {
  rawList: [],
  displayList: [],
};

export function noteReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SUCCESS:
      const { notes } = action.payload;
      return {
        ...state,
        rawList: notes.data,
      };
    case CAMPAIGN_SORT:
      return {
        ...state,
        displayList: filterByCampaign(state.rawList, action.payload),
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
