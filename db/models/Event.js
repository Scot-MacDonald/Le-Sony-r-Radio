// db/models/Event.js
const mongoose = require("mongoose");
const { Schema } = mongoose;
const slugify = require("slugify");

const eventSchema = new Schema({
  slug: { type: String, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageURL: { type: String, required: true },
  tags: { type: [String], default: [] }, // Add this line for tags
  type: { type: String, required: true },
});

eventSchema.pre("save", function (next) {
  // Generate the slug from the title
  this.slug = slugify(this.title, { lower: true });

  // Continue with the save operation
  next();
});

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;
