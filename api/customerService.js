export default {
  contactRequest(data) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(JSON.stringify(data)), 1000);
    });
  },
};
