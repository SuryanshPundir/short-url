import { nanoid } from "nanoid";
import URL from "../models/url.js";

async function handleGenerateNewShortUrl(req, res) {
  const { url } = req.body;

  if (!url) return res.status(400).json({ error: "URL is required" });

  const shortID = nanoid(8);

  await URL.create({
    shortID,
    redirectURL: url,
    visitHistory: [],
  });

  // Redirect back to homepage after creation
  res.redirect('/');
}

export { handleGenerateNewShortUrl };
