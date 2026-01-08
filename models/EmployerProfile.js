const mongoose = require('mongoose');

const employerProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  companyDescription: {
    type: String,
    maxlength: 2000
  },
  industry: {
    type: String,
    required: [true, 'Industry is required']
  },
  companySize: {
    type: String,
    enum: ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'],
    required: true
  },
  contactPerson: {
    firstName: String,
    lastName: String,
    position: String
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required']
  },
  website: {
    type: String,
    trim: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  logo: {
    type: String,
    default: null
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

employerProfileSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('EmployerProfile', employerProfileSchema);
