import instance from "./instance";

const playgroundService = {
  getPurposes() {
    return instance
      .get("getPurposes")
      .then((response) => response.data.purpose);
  },
};

export default playgroundService;
