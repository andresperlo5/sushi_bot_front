import axios from "axios";

const clientAxios = axios.create({
  baseURL: `${import.meta.env.VITE_URL_BACK}/api`,
});

clientAxios.interceptors.request.use(
  (config) => {
    const token = JSON.parse(sessionStorage.getItem("token"));

    if (token) {
      config.headers.auth = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default clientAxios;
