import { nanoid } from "nanoid";
import URL from "../models/url.js";

async function handleGenerateNewShortUrl(req, res) {
  let { url } = req.body;

  if (!url) return res.status(400).json({ error: "URL is required" });

  // ✅ Normalize the URL
  if (!/^https?:\/\//i.test(url)) {
    url = 'http://' + url;
  }

  const shortID = nanoid(8);

  await URL.create({
    shortID,
    redirectURL: url,
    visitHistory: [],
    createdBy: req.user._id
  });

  res.redirect('/');
}

export { handleGenerateNewShortUrl };
