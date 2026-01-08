const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  jobSeeker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  coverLetter: {
    type: String,
    maxlength: 2000
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'shortlisted', 'accepted', 'rejected'],
    default: 'pending'
  },
  appliedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

applicationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

applicationSchema.index({ job: 1, jobSeeker: 1 }, { unique: true });
applicationSchema.index({ jobSeeker: 1 });
applicationSchema.index({ status: 1 });

module.exports = mongoose.model('Application', applicationSchema);
