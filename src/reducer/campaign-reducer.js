import {
  CAMPAIGN_FETCH_SUCCESS,
  CAMPAIGN_ADD_SUCCESS,
  CAMPAIGN_EDIT_SUCCESS,
  CAMPAIGN_SELECT,
  CAMPAIGN_DELETE,
  LOGOUT,
} from "./dispatch-types";

export const initialState = {
  rawList: [],
  current: {},
};

export function campaignReducer(state = initialState, action) {
  switch (action.type) {
    case CAMPAIGN_FETCH_SUCCESS:
      return {
        ...state,
        rawList: action.payload,
      };
    case CAMPAIGN_SELECT:
      return {
        ...state,
        current: state.rawList.find((item) => item.id === action.payload),
      };
    case CAMPAIGN_ADD_SUCCESS:
      return {
        ...state,
        rawList: [...state.rawList, action.payload],
      };
    case CAMPAIGN_EDIT_SUCCESS:
      return {
        ...state,
        rawList: state.rawList.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        }),
      };
    case CAMPAIGN_DELETE:
      return {
        ...state,
        rawList: state.rawList.filter((item) => item.id !== action.payload),
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
