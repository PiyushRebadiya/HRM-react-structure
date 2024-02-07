import axios from "axios";

const axiosPublicHttp = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL_HRM}`,
});

axiosPublicHttp.interceptors.request.use(
  (config) => {
    return {
      ...config,
      headers: {
        ...config.headers,
      },
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosPublicHttp.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosPublicHttp;