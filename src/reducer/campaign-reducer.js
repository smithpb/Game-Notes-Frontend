import { FETCH_SUCCESS } from "./dispatch-types";

export const initialState = {
  list: []
};

export function campaignReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SUCCESS:
      const { campaigns } = action.payload;
      return {
        ...state,
        list: campaigns.data
      };
    default:
      return state;
  }
}
