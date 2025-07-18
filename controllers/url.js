import { nanoid } from "nanoid";
import URL from "../models/url.js"; // <- Add .js

async function handleGenerateNewShortUrl(req, res) {
  const body = req.body;

  if (!body.url) return res.status(400).json({ error: "URL is required" });

  const shortID = nanoid(8);

  await URL.create({
    shortID,
    redirectURL: body.url, // <- use the validated field
    visitHistory: [],
  });

  return res.json({ id: shortID });
}

export { handleGenerateNewShortUrl };
