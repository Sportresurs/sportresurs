import axios from "./axiosInstance";

const playgroundService = {
  purpose() {
    return axios.get("/purposes").then((response) => response.data.purpose);
  },
  createPlayground(formData) {
    return axios.post("/playground", formData, {
      headers: { "Content-Type": "form/multipart" },
    });
  },
};

export default playgroundService;
