import  mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String },
  name: { type: String },
  surname:{ type: String },
  password: { type: String },
  access_token: { type: String },
  refresh_token: { type: String }
});

export default mongoose.model('User', userSchema);