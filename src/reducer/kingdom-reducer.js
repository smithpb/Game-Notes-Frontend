import { FETCH_SUCCESS, CAMPAIGN_SORT } from "./dispatch-types";
import { filterByCampaign } from "../util/misc";

export const initialState = {
  rawList: [],
  campaignList: []
};

export function kingdomReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SUCCESS:
      const { kingdoms } = action.payload;
      return {
        ...state,
        rawList: kingdoms.data
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
