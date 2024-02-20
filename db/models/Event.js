// db/models/Event.js
const mongoose = require("mongoose");
const { Schema } = mongoose;
const slugify = require("slugify");

const eventSchema = new Schema({
  slug: { type: String, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageURL: { type: String, required: true },
  tags: { type: [String], default: [] },
  type: { type: String, required: true },
});

eventSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });

  next();
});

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;
