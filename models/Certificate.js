const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true
  },
  studentEmail: {
    type: String,
    required: [true, 'Student email is required'],
    trim: true,
    lowercase: true
  },
  certificateID: {
    type: String,
    required: [true, 'Certificate ID is required'],
    unique: true,
    trim: true
  },
  courseName: {
    type: String,
    required: [true, 'Course name is required'],
    trim: true
  },
  issueDate: {
    type: Date,
    default: Date.now
  },
  grade: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Certificate', certificateSchema);
