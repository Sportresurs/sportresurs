import axios from "./axiosInstance";

const playgroundService = {
  getPurposes() {
    return axios.get("/purposes").then((response) => response.data.purpose);
  },
  create(formData) {
    return axios.post("/playground", formData, {
      headers: { "Content-Type": "form/multipart" },
    });
  },
  update(formData, id) {
    return axios.patch(`/playground/edit-playground?id=${id}`, formData, {
      headers: { "Content-Type": "form/multipart" },
    });
  },
  search(query) {
    return axios
      .get("/areas", {
        params: {
          query,
        },
      })
      .then((res) => res.data);
  },
  patch(id, payload) {
    return axios.patch(`/areas/${id}`, payload).then((res) => res.data);
  },
};

export default playgroundService;
