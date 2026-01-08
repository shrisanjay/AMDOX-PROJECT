const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const Job = require('../models/Job');
const JobSeekerProfile = require('../models/JobSeekerProfile');
const { protect, authorize } = require('../middleware/auth');

router.post('/', protect, authorize('job_seeker'), async (req, res) => {
  try {
    const { jobId, coverLetter } = req.body;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    if (job.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'This job is no longer accepting applications'
      });
    }

    const existingApplication = await Application.findOne({
      job: jobId,
      jobSeeker: req.user._id
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied for this job'
      });
    }

    const application = await Application.create({
      job: jobId,
      jobSeeker: req.user._id,
      coverLetter
    });

    res.status(201).json({
      success: true,
      application
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

router.get('/jobseeker', protect, authorize('job_seeker'), async (req, res) => {
  try {
    const applications = await Application.find({ jobSeeker: req.user._id })
      .populate({
        path: 'job',
        populate: {
          path: 'employer',
          select: 'email'
        }
      })
      .sort({ appliedAt: -1 });

    const applicationsWithCompany = await Promise.all(applications.map(async (app) => {
      if (!app.job) return app;
      
      const EmployerProfile = require('../models/EmployerProfile');
      const employerProfile = await EmployerProfile.findOne({ user: app.job.employer._id });
      
      return {
        ...app.toObject(),
        job: {
          ...app.job.toObject(),
          companyName: employerProfile?.companyName || 'Unknown Company'
        }
      };
    }));

    res.json({
      success: true,
      applications: applicationsWithCompany
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

router.get('/job/:jobId', protect, authorize('employer'), async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    if (job.employer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view applications for this job'
      });
    }

    const applications = await Application.find({ job: req.params.jobId })
      .populate('jobSeeker', 'email')
      .sort({ appliedAt: -1 });

    const applicationsWithProfile = await Promise.all(applications.map(async (app) => {
      const profile = await JobSeekerProfile.findOne({ user: app.jobSeeker._id });
      return {
        ...app.toObject(),
        profile: profile ? {
          firstName: profile.firstName,
          lastName: profile.lastName,
          phone: profile.phone,
          resumePath: profile.resumePath,
          skills: profile.skills,
          summary: profile.summary
        } : null
      };
    }));

    res.json({
      success: true,
      applications: applicationsWithProfile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

router.put('/:id/status', protect, authorize('employer'), async (req, res) => {
  try {
    const { status } = req.body;
    
    const application = await Application.findById(req.params.id).populate('job');
    
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    if (application.job.employer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this application'
      });
    }

    application.status = status;
    await application.save();

    res.json({
      success: true,
      application
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
