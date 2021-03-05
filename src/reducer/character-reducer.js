import { FETCH_SUCCESS, CAMPAIGN_SORT, LOGOUT } from "./dispatch-types";
import { filterByCampaign } from "../util/misc";

export const initialState = {
  rawList: [],
  displayList: [],
};

export function characterReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SUCCESS:
      const { characters } = action.payload;
      return {
        ...state,
        rawList: characters.data,
      };
    case CAMPAIGN_SORT:
      return {
        ...state,
        displayList: filterByCampaign(state.rawList, action.payload),
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
