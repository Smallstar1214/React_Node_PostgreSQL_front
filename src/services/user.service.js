import http from "../http-common";
import axios from "axios";

export const SERVER_URL =
  process.env.REACT_APP_BACKEND_URL;

const jwtInterceoptor = axios.create({});

jwtInterceoptor.interceptors.request.use((config) => {
  let tokensData = JSON.parse(localStorage.getItem("tokens"));
  config.headers.set("Authorization", `bearer ${tokensData.accessToken}`);
  return config;
});

jwtInterceoptor.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    try {
      if (error.response.status === 401) {
        const tokens = JSON.parse(localStorage.getItem("tokens"));
        const payload = {
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        };

        let apiResponse = await axios.post(
          `${SERVER_URL}/api/auth/refreshtoken`,
          payload
        );
        localStorage.setItem("tokens", JSON.stringify(apiResponse.data.tokens));
        error.config.headers.set(
          "Authorization",
          `bearer ${apiResponse.data.tokens.accessToken}`
        );
        return axios(error.config);
      } else {
        return Promise.reject(error);
      }
    } catch (e) {
      localStorage.removeItem("tokens");
      window.location.replace(window.location.origin + "/login");
    }
  }
);

const login = (data) => axios.post(`${SERVER_URL}/api/auth/login`, data);
const signup = (data) => axios.post(`${SERVER_URL}/api/auth/signup`, data);
const resetPassword = (data) =>
  jwtInterceoptor.post(`${SERVER_URL}/api/auth/reset-password`, data);

class UserService {
  getAll(searchKey) {
    return axios.get(`${SERVER_URL}/api/users?searchKey=${searchKey}`);
  }

  getById(id) {
    return axios.get(`${SERVER_URL}/api/users/${id}`);
  }

  create(data) {
    return axios.post(`${SERVER_URL}/api/users`, data);
  }

  update(id, data) {
    return axios.put(`${SERVER_URL}/api/users/${id}`, data);
  }

  delete(id) {
    return axios.delete(`${SERVER_URL}/api/users/${id}`);
  }

  uploadFile(formData) {
    return axios.post(`http://localhost:8080/api/fileUpload`, formData);
  }
}

export default new UserService();