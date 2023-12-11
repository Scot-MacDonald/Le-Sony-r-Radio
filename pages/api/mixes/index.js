// pages/api/mixes/index.js
import dbConnect from "@/db/connect";
import Mix from "@/db/models/Mix";

// pages/api/mixes/index.js

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const { tags, search } = request.query;

    const tagQuery = tags
      ? { tags: { $in: Array.isArray(tags) ? tags : [tags] } }
      : {};

    const searchQuery = search
      ? {
          $or: [
            { title: { $regex: new RegExp(search), $options: "i" } },
            { description: { $regex: new RegExp(search), $options: "i" } },
          ],
        }
      : {};

    const query = { ...tagQuery, ...searchQuery };

    // Sort by date in descending order
    const mixes = await Mix.find(query).sort({ date: -1 });

    return response.status(200).json(mixes);
  }

  if (request.method === "POST") {
    try {
      const mixData = request.body;
      mixData.tags = mixData.tags || []; // Ensure tags is an array
      await Mix.create(mixData);

      response.status(201).json({ status: "Mix created" });
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }
}
