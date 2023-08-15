import axios from "axios";

export const SERVER_URL = "http://localhost:8080";

const jwtInterceoptor = axios.create({});

jwtInterceoptor.interceptors.request.use((config) => {
  let token = localStorage.getItem("token");
  config.headers.set("Authorization", `bearer ${token}`);
  return config;
});

jwtInterceoptor.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    try {
      if (error.response.status === 401) {
        const token = localStorage.getItem("token");
        const payload = {
          token: token,
        };
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

const getAllUsers = (searchKey) => jwtInterceoptor.get(`${SERVER_URL}/api/users?searchKey=${searchKey}`);
const getUserById = (id) => jwtInterceoptor.get(`${SERVER_URL}/api/users/${id}`);
const createUser = (data) => jwtInterceoptor.post(`${SERVER_URL}/api/users`, data);
const updateUser = (id, data) => jwtInterceoptor.put(`${SERVER_URL}/api/users/${id}`, data);
const deleteUser = (id) => jwtInterceoptor.delete(`${SERVER_URL}/api/users/${id}`);
const uploadFile = (formData) => axios.post(`${SERVER_URL}/api/fileUpload`, formData);


const getAllCampaigns = (searchKey, megaMenu, page, pageSize) =>
  jwtInterceoptor.get(`${SERVER_URL}/api/campaigns?searchKey=${searchKey}&megaMenu=${megaMenu}&page=${page}&pageSize=${pageSize}`);
const getCampaignById = (id) => jwtInterceoptor.get(`${SERVER_URL}/api/campaigns/${id}`);
const createCampaign = (data) => jwtInterceoptor.post(`${SERVER_URL}/api/campaigns`, data);
const updateCampaign = (id, data) => jwtInterceoptor.put(`${SERVER_URL}/api/campaigns/${id}`, data);
const uploadPortfolio = (id, formData) => axios.post(`${SERVER_URL}/api/image/${id}`, formData);
// const updateCampaignPortfolio = (id, data) => jwtInterceoptor.put(`${SERVER_URL}/api/campaigns/screen/${id}`, data);

const addReport = (id, data) => jwtInterceoptor.put(`${SERVER_URL}/api/report/${id}`, data);
const getReportById = (id) => jwtInterceoptor.get(`${SERVER_URL}/api/report/${id}`);
const getExportDataById = (id) => jwtInterceoptor.get(`${SERVER_URL}/api/export/${id}`);

export const ApiService = {
  login,
  signup,
  resetPassword,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  uploadFile,
  getAllCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  addReport,
  getReportById,
  getExportDataById,
  uploadPortfolio,
  // updateCampaignPortfolio
}