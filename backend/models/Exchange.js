import mongoose from 'mongoose';

const exchangeSchema = new mongoose.Schema({
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  seeker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  skill: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'completed', 'cancelled'],
    default: 'pending'
  },
  duration: {
    type: Number,
    required: true,
    min: 1
  },
  scheduledDate: {
    type: Date,
    required: true
  },
  message: String,
  completionNotes: String,
  rating: {
    provider: Number,
    seeker: Number
  },
  reviews: {
    provider: String,
    seeker: String
  }
}, {
  timestamps: true
});

export default mongoose.model('Exchange', exchangeSchema);
