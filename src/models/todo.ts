import mongoose from "mongoose";

const ToDo = new mongoose.Schema({
  payload: {
    type: String,
  },
});

export default mongoose.model("ToDo", ToDo);
