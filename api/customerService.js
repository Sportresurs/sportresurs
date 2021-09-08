export default {
  contactRequest() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(JSON.stringify(data)), 1000);
    });
  },
};
