import axios from "axios";
// const BASEURL = "https://demo.kanhape.com/api/";
export const BASEURL = "http://localhost:5000/api/";

export const API = axios.create({
  baseURL: BASEURL,
  headers: { token: localStorage.getItem("AccessToken") },
});
