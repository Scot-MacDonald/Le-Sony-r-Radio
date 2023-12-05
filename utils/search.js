// utils/search.js
import Mix from "@/db/models/Mix";

export async function searchMixes(query) {
  const regex = new RegExp(query, "i"); // Case-insensitive search

  const results = await Mix.find({
    $or: [{ title: { $regex: regex } }, { tags: { $in: [regex] } }],
  });

  return results;
}
