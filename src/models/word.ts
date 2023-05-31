import mongoose from "mongoose";

const wordSchema = new mongoose.Schema({
  en: {
    type: String,
  },
  arm: {
    type: String,
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
  },
});

export default mongoose.model("Word", wordSchema);
