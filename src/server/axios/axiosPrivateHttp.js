import axios from "axios";

const axiosPrivateHttp = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL_HRM}`,
});

axiosPrivateHttp.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("HRMtoken");
    return {
      ...config,
      headers: {
        ...(token !== null && { Authorization: `bearer ${token}` }),
        ...config.headers,
      },
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosPrivateHttp.interceptors.response.use(
  (response) => {
    //const url = response.config.url;

    //setLocalStorageToken(token);
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      //(`unauthorized :)`);
      //removeLocalStorageToken

      // use for future purpose
      // localStorage.clear();
      // window.location.href = "/404";
    }
    return Promise.reject(error);
  }
);

export default axiosPrivateHttp;