import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  name: String,
  description: String,
  runningTime: Number,
  thumbnail: String,
});

export default mongoose.model('Movie', movieSchema);