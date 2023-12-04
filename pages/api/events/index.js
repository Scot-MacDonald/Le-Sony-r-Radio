// pages/api/events/index.js
import dbConnect from "@/db/connect";
import Event from "@/db/models/Event";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const events = await Event.find();
    return response.status(200).json(events);
  }

  if (request.method === "POST") {
    try {
      const eventData = request.body;
      await Event.create(eventData);

      response.status(201).json({ status: "Event created" });
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }
}
