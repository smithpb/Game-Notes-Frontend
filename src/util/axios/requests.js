import axios from "axios";
import { FETCH_SUCCESS, LOADING } from "../../reducer/dispatch-types";

// export const api = "http://localhost:5000/api";
export const api = "http://10.0.0.82:5000/api";

export const axiosReq = async (method = "get", endpoint, data = {}) => {
  return await axios({
    method,
    url: `${api}${endpoint}`,
    data,
    headers: { Authorization: localStorage.getItem("jwt") || "" },
  });
};

export const fetchAllData = async (dispatch) => {
  const endpoints = [
    "campaigns",
    "kingdoms",
    "locations",
    "characters",
    "notes",
  ];
  const requests = endpoints.map((endpoint) => axiosReq("get", `/${endpoint}`));

  dispatch({ type: LOADING });

  try {
    const [campaigns, kingdoms, locations, characters, notes] = await axios.all(
      requests
    );
    const fullPayload = { campaigns, kingdoms, locations, characters, notes };

    dispatch({ type: FETCH_SUCCESS, payload: fullPayload });
  } catch (e) {
    console.log(e.response);
  }
};
