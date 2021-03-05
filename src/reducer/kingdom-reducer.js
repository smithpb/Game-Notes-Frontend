import { DATA_FETCH_SUCCESS, LOGOUT } from "./dispatch-types";
// import { filterByCampaign } from "../util/misc";

export const initialState = {
  rawList: [],
  displayList: [],
};

export function kingdomReducer(state = initialState, action) {
  switch (action.type) {
    case DATA_FETCH_SUCCESS:
      const { kingdoms } = action.payload;
      return {
        ...state,
        displayList: kingdoms.data,
        rawList: kingdoms.data,
      };
    // case CAMPAIGN_SORT:
    //   return {
    //     ...state,
    //     displayList: filterByCampaign(state.rawList, action.payload),
    //   };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
