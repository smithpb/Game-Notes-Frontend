import axios from "axios";
import {
  DATA_FETCH_SUCCESS,
  CAMPAIGN_FETCH_SUCCESS,
  LOADING,
  FAILURE,
} from "../../reducer/dispatch-types";

export const api = "http://localhost:5000/api";
// export const api = "http://10.0.0.82:5000/api";

export const axiosReq = async (method = "get", endpoint, data = {}) => {
  return await axios({
    method,
    url: `${api}${endpoint}`,
    data,
    headers: { Authorization: localStorage.getItem("jwt") || "" },
  });
};

export const fetchCampaigns = async (dispatch) => {
  dispatch({ type: LOADING });

  try {
    const res = await axiosReq("get", "/campaigns");
    dispatch({ type: CAMPAIGN_FETCH_SUCCESS, payload: res.data });
  } catch (err) {
    console.log(err);
    dispatch({ type: FAILURE, payload: err.response.data.message });
  }
};

export const fetchCampaignData = async (dispatch, id) => {
  const endpoints = ["kingdoms", "locations", "characters", "notes"];

  dispatch({ type: LOADING });

  try {
    if (!id) throw new Error("There currently is go campaign selected.");

    const [kingdoms, locations, characters, notes] = await axios.all(
      endpoints.map((endpoint) => axiosReq("get", `/${endpoint}/${id}`))
    );
    const fullPayload = { kingdoms, locations, characters, notes };

    dispatch({ type: DATA_FETCH_SUCCESS, payload: fullPayload });
  } catch (err) {
    const message = err.response?.data.message || err.message;
    dispatch({
      type: FAILURE,
      payload: message,
    });
  }
};
