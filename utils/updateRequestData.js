const updateRequestData = async (requestID, requestStatus, adminEmail) => {
  await fetch(`${process.env.NEXT_PUBLIC_HOST}api/getRequests`, {
    method: "PATCH",
    body: JSON.stringify({
      id: requestID,
      status: requestStatus,
      email: adminEmail,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default updateRequestData;
