import axios from "./axiosInstance";

const imageService = {
  deleteImage(id) {
    axios.delete(`/images/related/${id}`);
  },
};

export default imageService;
