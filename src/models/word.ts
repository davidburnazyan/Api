import mongoose from "mongoose";

const wordSchema = new mongoose.Schema({
  en: {
    type: String,
  },
  arm: {
    type: String,
  },
});

export default mongoose.model("Word", wordSchema);
