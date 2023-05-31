import mongoose from "mongoose";

const wordGroupSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  word: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Word',
  },
});

export default mongoose.model("WordGroup", wordGroupSchema);
