const customerService = async (data) => {
  const promise = new Promise((resolve) => {
    setTimeout(() => resolve(JSON.stringify(data)), 5000);
  });
  const result = await promise;
  return result;
};

export default customerService;
