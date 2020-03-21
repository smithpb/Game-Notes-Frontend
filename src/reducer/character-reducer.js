import { FETCH_SUCCESS, CAMPAIGN_SORT } from "./dispatch-types";
import { filterByCampaign } from "../util/misc";

export const initialState = {
  rawList: [],
  campaignList: []
};

export function characterReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SUCCESS:
      const { characters } = action.payload;
      return {
        ...state,
        rawList: characters.data
      };
    case CAMPAIGN_SORT:
      return {
        ...state,
        campaignList: filterByCampaign(state.rawList, action.payload)
      };
    default:
      return state;
  }
}
