// pages/api/featured/featured.js
import dbConnect from "@/db/connect";
import Mix from "@/db/models/Mix";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const sortQuery = { date: -1 }; // Sort by date in descending order (newest first)

    // Limit the number of documents to 4
    const mixes = await Mix.find().sort(sortQuery).limit(4);
    console.log("Resulting mixes:", mixes);

    return response.status(200).json(mixes);
  }
}
