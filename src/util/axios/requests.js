import axios from "axios";

export const api = "http://localhost:5000/api";

export const axiosReq = async (method = "get", endpoint, data = {}) => {
  return await axios({
    method,
    url: `${api}${endpoint}`,
    data
  });
};
