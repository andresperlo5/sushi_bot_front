import axios from "axios";

const clientAxios = axios.create({
  baseURL: `${import.meta.env.VITE_URL_BACK}/api`,
});

clientAxios.interceptors.request.use(
  (config) => {
    // Obtén el token de sessionStorage cada vez que se haga una solicitud
    const token = JSON.parse(sessionStorage.getItem("token"));

    if (token) {
      // Agrega el token al header Authorization
      config.headers.auth = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Maneja el error
    return Promise.reject(error);
  }
);

export default clientAxios;
