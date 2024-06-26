import axios from "axios";
import queryString from "query-string";

const baseURL = "https://genesis-beige.vercel.app/api/v1/";

const privateClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: params => queryString.stringify(params)
  }
});

privateClient.interceptors.request.use(async config => {
  return {
    ...config,
    headers: {
      "Content-Type": "multipart/form-data",
    }
  };
});

privateClient.interceptors.response.use((response) => {
  if (response && response?.data) return response?.data;
  return response;
}, (err) => {
  throw err.response?.data;
});

export default privateClient;