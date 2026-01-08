const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const EmployerProfile = require('../models/EmployerProfile');
const { protect, authorize } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const { keyword, jobType, city, country, minSalary, maxSalary, page = 1, limit = 10 } = req.query;
    
    let query = { status: 'active' };

    if (keyword) {
      query.$text = { $search: keyword };
    }

    if (jobType) {
      query.jobType = jobType;
    }

    if (city) {
      query['location.city'] = new RegExp(city, 'i');
    }

    if (country) {
      query['location.country'] = new RegExp(country, 'i');
    }

    if (minSalary || maxSalary) {
      query['salaryRange.min'] = {};
      if (minSalary) {
        query['salaryRange.min'].$gte = Number(minSalary);
      }
      if (maxSalary) {
        query['salaryRange.max'] = { $lte: Number(maxSalary) };
      }
    }

    const jobs = await Job.find(query)
      .populate('employer', 'email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Job.countDocuments(query);

    const jobsWithCompany = await Promise.all(jobs.map(async (job) => {
      const employerProfile = await EmployerProfile.findOne({ user: job.employer._id });
      return {
        ...job.toObject(),
        companyName: employerProfile?.companyName || 'Unknown Company'
      };
    }));

    res.json({
      success: true,
      jobs: jobsWithCompany,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('employer', 'email');
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    const employerProfile = await EmployerProfile.findOne({ user: job.employer._id });

    res.json({
      success: true,
      job: {
        ...job.toObject(),
        companyName: employerProfile?.companyName || 'Unknown Company',
        companyDescription: employerProfile?.companyDescription,
        industry: employerProfile?.industry
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

router.post('/', protect, authorize('employer'), async (req, res) => {
  try {
    const jobData = {
      employer: req.user._id,
      ...req.body
    };

    const job = await Job.create(jobData);

    res.status(201).json({
      success: true,
      job
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

router.put('/:id', protect, authorize('employer'), async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    if (job.employer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this job'
      });
    }

    job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({
      success: true,
      job
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

router.delete('/:id', protect, authorize('employer'), async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    if (job.employer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this job'
      });
    }

    await job.deleteOne();

    res.json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

router.get('/employer/:employerId', protect, async (req, res) => {
  try {
    const jobs = await Job.find({ employer: req.params.employerId })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      jobs
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
