import  mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  message: {
    type: String
  },
  from: {
    type: String
  },
  to:{
    type: String,
    bcrypt: true
  },
});

export default mongoose.model('Message', messageSchema);