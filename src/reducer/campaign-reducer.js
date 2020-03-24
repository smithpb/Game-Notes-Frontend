import {
  FETCH_SUCCESS,
  CAMPAIGN_ADD_SUCCESS,
  CAMPAIGN_EDIT_SUCCESS,
  CAMPAIGN_DELETE
} from "./dispatch-types";

export const initialState = {
  rawList: []
};

export function campaignReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SUCCESS:
      const { campaigns } = action.payload;
      return {
        ...state,
        rawList: campaigns.data
      };
    case CAMPAIGN_ADD_SUCCESS:
      return {
        ...state,
        rawList: [...state.rawList, action.payload]
      };
    case CAMPAIGN_EDIT_SUCCESS:
      return {
        ...state,
        rawList: state.rawList.map(item => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        })
      };
    case CAMPAIGN_DELETE:
      return {
        ...state,
        rawList: state.rawList.filter(item => item.id !== action.payload)
      };
    default:
      return state;
  }
}
