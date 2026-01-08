const express = require('express');
const router = express.Router();
const JobSeekerProfile = require('../models/JobSeekerProfile');
const EmployerProfile = require('../models/EmployerProfile');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/jobseeker/:userId', protect, async (req, res) => {
  try {
    const profile = await JobSeekerProfile.findOne({ user: req.params.userId });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    res.json({
      success: true,
      profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

router.post('/jobseeker', protect, authorize('job_seeker'), async (req, res) => {
  try {
    const profileData = {
      user: req.user._id,
      ...req.body
    };

    let profile = await JobSeekerProfile.findOne({ user: req.user._id });

    if (profile) {
      profile = await JobSeekerProfile.findOneAndUpdate(
        { user: req.user._id },
        profileData,
        { new: true, runValidators: true }
      );
    } else {
      profile = await JobSeekerProfile.create(profileData);
    }

    res.json({
      success: true,
      profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

router.post('/jobseeker/resume', protect, authorize('job_seeker'), upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a file'
      });
    }

    const profile = await JobSeekerProfile.findOneAndUpdate(
      { user: req.user._id },
      { resumePath: req.file.path },
      { new: true, upsert: true }
    );

    res.json({
      success: true,
      message: 'Resume uploaded successfully',
      resumePath: req.file.path,
      profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

router.get('/employer/:userId', protect, async (req, res) => {
  try {
    const profile = await EmployerProfile.findOne({ user: req.params.userId });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    res.json({
      success: true,
      profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

router.post('/employer', protect, authorize('employer'), async (req, res) => {
  try {
    const profileData = {
      user: req.user._id,
      ...req.body
    };

    let profile = await EmployerProfile.findOne({ user: req.user._id });

    if (profile) {
      profile = await EmployerProfile.findOneAndUpdate(
        { user: req.user._id },
        profileData,
        { new: true, runValidators: true }
      );
    } else {
      profile = await EmployerProfile.create(profileData);
    }

    res.json({
      success: true,
      profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;
