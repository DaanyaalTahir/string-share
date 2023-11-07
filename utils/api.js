import axios from "axios";
import { ENDPOINT } from "../globals";

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: ENDPOINT,
});

// Define a function to set the access token in the interceptor
export function setAccessToken(accessToken) {
  api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
}

// Define a function to remove the access token from the interceptor
export function removeAccessToken() {
  api.defaults.headers.common.Authorization = undefined;
}

export default api;
