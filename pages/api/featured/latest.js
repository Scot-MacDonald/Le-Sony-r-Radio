// pages/api/mixes/featured/latest.js
import dbConnect from "@/db/connect";
import Mix from "@/db/models/Mix";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const latestMix = await Mix.findOne().sort({ date: -1 }).limit(1);
      if (latestMix) {
        return response.status(200).json(latestMix);
      } else {
        return response.status(404).json({ message: "Latest mix not found" });
      }
    } catch (error) {
      console.error("Error fetching the latest mix:", error);
      return response.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return response.status(405).json({ message: "Method Not Allowed" });
  }
}
