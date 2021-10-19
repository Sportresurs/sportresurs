async function getRequestsAmount() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}api/getRequests`, {
    method: "GET",
  });
  const requests = await res.json();
  const newRequests = requests.userRequests.filter(
    (el) => el.status === "новий"
  ).length;
  return newRequests;
}

export default getRequestsAmount;
