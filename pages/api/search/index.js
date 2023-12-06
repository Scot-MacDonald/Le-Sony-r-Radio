// pages/api/search.js
import dbConnect from "@/db/connect";
import Event from "@/db/models/Event";
import Mix from "@/db/models/Mix";

export default async function handler(req, res) {
  const { query } = req.query;

  try {
    // Connect to the MongoDB database
    await dbConnect();

    // Search for matching events and mixes
    const results = await Promise.all([
      Event.find({
        $or: [
          { title: { $regex: query, $options: "i" } }, // Case-insensitive title search
          { city: { $regex: query, $options: "i" } }, // Case-insensitive city search
        ],
      }),
      Mix.find({
        $or: [
          { title: { $regex: query, $options: "i" } }, // Case-insensitive title search
          { city: { $regex: query, $options: "i" } }, // Case-insensitive city search
        ],
      }),
    ]);

    // Combine and send the results
    const combinedResults = [...results[0], ...results[1]];
    res.status(200).json({ results: combinedResults });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
