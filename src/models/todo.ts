import mongoose from "mongoose";

const ToDo = new mongoose.Schema({
  id: {
    type: String,
  },
  title: {
    type: String,
  },
  image: {
    type: String,
  },
});

export default mongoose.model("ToDo", ToDo);
