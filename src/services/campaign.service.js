import http from "../http-common";

class CampaignService {
  getAll(searchKey, megaMenu, page, pageSize) {
    return http.get(`/campaigns?searchKey=${searchKey}&megaMenu=${megaMenu}&page=${page}&pageSize=${pageSize}`);
  }

  getById(id) {
    return http.get(`/campaigns/${id}`);
  }

  create(data) {
    return http.post("/campaigns", data);
  }

  update(id, data) {
    return http.put(`/campaigns/${id}`, data);
  }

  // delete(id) {
  //   return http.delete(`/campaign/${id}`);
  // }
}

export default new CampaignService();