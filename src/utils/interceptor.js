import axios from "axios";
const BASEURL = "https://dev.kanhape.com/api/";

export const API = axios.create({
  baseURL: BASEURL,
  headers: {
    token: localStorage.getItem("AccessToken"),
  },
});
