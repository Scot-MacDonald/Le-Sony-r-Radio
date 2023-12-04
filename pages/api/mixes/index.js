// pages/api/mixes/index.js
import dbConnect from "@/db/connect";
import Mix from "@/db/models/Mix";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const { tags } = request.query;
    console.log("Received tags:", tags);

    const query = tags
      ? { tags: { $in: Array.isArray(tags) ? tags : [tags] } }
      : {};
    console.log("Constructed query:", query);

    const mixes = await Mix.find(query);
    console.log("Resulting mixes:", mixes);

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
