import axios from "axios";
import { FETCH_SUCCESS } from "../../reducer/dispatch-types";

export const api = "http://localhost:5000/api";

export const axiosReq = async (method = "get", endpoint, data = {}) => {
  return await axios({
    method,
    url: `${api}${endpoint}`,
    data,
    headers: { Authorization: localStorage.getItem("jwt") || "" }
  });
};

export const fetchAllData = async dispatch => {
  try {
    const [campaigns] = await axios.all([axiosReq("get", "/campaigns")]);
    const fullPayload = { campaigns };
    console.log(campaigns);
    dispatch({ type: FETCH_SUCCESS, payload: fullPayload });
  } catch (e) {
    console.log(e.response);
  }
};
