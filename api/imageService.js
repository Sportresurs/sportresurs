import axios from "./axiosInstance";

const imageService = {
  deleteImage(id) {
    return axios.delete(`/images/related/${id}`);
  },
};

export default imageService;
