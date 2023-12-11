// pages/api/search.js
import dbConnect from "@/db/connect";
import Event from "@/db/models/Event";
import Mix from "@/db/models/Mix";

export default async function handler(req, res) {
  const { query } = req.query;

  try {
    // Connect to the MongoDB database
    await dbConnect();

    // Search for matching events and mixes based on titles, cities, and tags
    const eventResults = await Event.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { city: { $regex: query, $options: "i" } },
        { type: { $regex: query, $options: "i" } },
        { tags: { $in: [query] } }, // Search by tag
      ],
    });

    const mixResults = await Mix.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { city: { $regex: query, $options: "i" } },
        { type: { $regex: query, $options: "i" } },
        { tags: { $in: [query] } },
      ],
    });

    // Combine and send the results
    const combinedResults = [...eventResults, ...mixResults];
    res.status(200).json({ results: combinedResults });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
