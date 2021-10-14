import axios from "./axiosInstance";

const playgroundService = {
  getPurpose() {
    return axios.get("/purposes").then((response) => response.data.purpose);
  },
  create(formData) {
    return axios.post("/playground", formData, {
      headers: { "Content-Type": "form/multipart" },
    });
  },
};

export default playgroundService;
