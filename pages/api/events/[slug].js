// pages/api/events/[slug].js
import dbConnect from "@/db/connect";
import Event from "@/db/models/Event";

export default async function handler(request, response) {
  await dbConnect();
  const { slug } = request.query; // Change 'id' to 'slug'

  if (request.method === "GET") {
    const event = await Event.findOne({ slug }); // Use 'findOne' instead of 'findById'

    if (!event) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(event);
  }

  if (request.method === "PUT") {
    await Event.findOneAndUpdate({ slug }, { $set: request.body }); // Use 'findOneAndUpdate'

    response.status(200).json({ message: "Success!" });
  }

  if (request.method === "DELETE") {
    await Event.findOneAndDelete({ slug }); // Use 'findOneAndDelete'

    response.status(200).json({ message: "Success!" });
  }
}
