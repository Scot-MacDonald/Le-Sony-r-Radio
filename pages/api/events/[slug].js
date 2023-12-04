// pages/api/events/[slug].js
import dbConnect from "../../../db/connect";
import Event from "../../../db/models/Event";

export default async function handler(request, response) {
  await dbConnect();
  const { slug } = request.query;

  if (request.method === "GET") {
    const event = await Event.findOne({ slug });

    if (!event) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(event);
  }

  // Add similar handling for PUT and DELETE if needed
}
