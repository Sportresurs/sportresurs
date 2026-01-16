import { Readable } from "stream";

export default async (req, res) => {
  const url = decodeURIComponent(req.query.url);
  const result = await fetch(url);
  if (!result.body) {
    return res.status(400).json({ error: "Invalid response" });
  }
  // Convert Web ReadableStream to Node.js Stream for Node 18+
  res.setHeader("Content-Type", result.headers.get("content-type") || "application/octet-stream");
  return Readable.from(result.body).pipe(res);
};
