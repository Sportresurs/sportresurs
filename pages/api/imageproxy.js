export default async (req, res) => {
  const url = decodeURIComponent(req.query.url);
  const result = await fetch(url);
  if (!result.body) {
    return res.status(400).json({ error: "Invalid response" });
  }
  return result.body.pipe(res);
};
