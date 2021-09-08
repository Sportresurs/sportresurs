const customerService = (data) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(JSON.stringify(data)), 1000);
  }).then((result) => result);

export default customerService;
