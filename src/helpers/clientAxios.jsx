import axios from "axios";

const token = JSON.parse(sessionStorage.getItem("token")) || "";

const clientAxios = axios.create({
  baseURL: `${import.meta.env.VITE_URL_BACK}/api`,
});

export const configHeader = {
  headers: {
    "content-type": "application/json",
    auth: `Bearer ${token}`,
  },
};

export const configHeaderImg = {
  headers: {
    "content-type": "multipart/form-data",
  },
};

export default clientAxios;
