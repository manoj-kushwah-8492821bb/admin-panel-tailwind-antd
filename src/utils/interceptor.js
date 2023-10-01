import axios from "axios";
const BASEURL = process.env.REACT_APP_BASEURL;
// const BASEURL = "http://localhost:5000/api/";

export const API = axios.create({
  baseURL: BASEURL,
  headers: { token: localStorage.getItem("AccessToken") },
});
