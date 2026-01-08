const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Job description is required']
  },
  qualifications: {
    type: String,
    required: [true, 'Qualifications are required']
  },
  responsibilities: {
    type: String,
    required: [true, 'Responsibilities are required']
  },
  jobType: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'internship', 'temporary'],
    required: [true, 'Job type is required']
  },
  location: {
    city: {
      type: String,
      required: true
    },
    state: String,
    country: {
      type: String,
      required: true
    },
    remote: {
      type: Boolean,
      default: false
    }
  },
  salaryRange: {
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'USD'
    }
  },
  status: {
    type: String,
    enum: ['active', 'closed', 'draft'],
    default: 'active'
  },
  applicationDeadline: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

jobSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

jobSchema.index({ title: 'text', description: 'text' });
jobSchema.index({ 'location.city': 1, 'location.country': 1 });
jobSchema.index({ jobType: 1 });
jobSchema.index({ status: 1 });

module.exports = mongoose.model('Job', jobSchema);
