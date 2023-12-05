// // pages/api/mixes/index.js
// import dbConnect from "@/db/connect";
// import Podcast from "@/db/models/Podcast";

// export default async function handler(request, response) {
//   await dbConnect();

//   if (request.method === "GET") {
//     const { tags } = request.query;
//     console.log("Received tags:", tags);

//     const query = tags
//       ? { tags: { $in: Array.isArray(tags) ? tags : [tags] } }
//       : {};
//     console.log("Constructed query:", query);

//     const mixes = await Podcast.find(query);
//     console.log("Resulting podcasts:", podcasts);

//     return response.status(200).json(podcasts);
//   }

//   if (request.method === "POST") {
//     try {
//       const podcastData = request.body;
//       podcastData.tags = podcastData.tags || []; // Ensure tags is an array
//       await Podcast.create(podcastData);

//       response.status(201).json({ status: "Mix created" });
//     } catch (error) {
//       response.status(400).json({ error: error.message });
//     }
//   }
// }
