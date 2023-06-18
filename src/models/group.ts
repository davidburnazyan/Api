import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  word: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Word',
  },
});

export default mongoose.model("Group", groupSchema);
