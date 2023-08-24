import axios from "axios";
const BASEURL = process.env.REACT_APP_BASEURL;

export const API = axios.create({
  baseURL: BASEURL,
  headers: { token: localStorage.getItem("AccessToken") },
});
