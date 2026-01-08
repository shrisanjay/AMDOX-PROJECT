const express = require('express');
const router = express.Router();
const User = require('../models/User');
const EmployerProfile = require('../models/EmployerProfile');
const Job = require('../models/Job');

router.get('/seed-jobs', async (req, res) => {
  try {
    let employer = await User.findOne({ email: 'testemployer@example.com' });
    
    if (!employer) {
      employer = await User.create({
        email: 'testemployer@example.com',
        password: 'test123',
        role: 'employer'
      });
    }

    let employerProfile = await EmployerProfile.findOne({ user: employer._id });
    
    if (!employerProfile) {
      employerProfile = await EmployerProfile.create({
        user: employer._id,
        companyName: 'Tech Innovations Inc',
        companyDescription: 'Leading technology company specializing in AI and cloud solutions',
        industry: 'Technology',
        companySize: '201-500',
        phone: '+1-555-0123',
        website: 'https://techinnovations.example.com',
        address: {
          city: 'San Francisco',
          state: 'CA',
          country: 'USA'
        }
      });
    }

    const sampleJobs = [
      {
        employer: employer._id,
        title: 'Senior Software Engineer',
        description: 'We are looking for an experienced Senior Software Engineer to join our dynamic team. You will be responsible for designing, developing, and maintaining scalable web applications using modern technologies.',
        qualifications: 'Bachelor\'s degree in Computer Science or related field\n5+ years of experience in software development\nProficiency in JavaScript, React, Node.js\nExperience with cloud platforms (AWS, Azure, or GCP)',
        responsibilities: 'Design and develop scalable web applications\nWrite clean, maintainable code\nConduct code reviews and mentor junior developers\nCollaborate with cross-functional teams',
        jobType: 'full-time',
        location: { city: 'San Francisco', country: 'USA', remote: true },
        salaryRange: { min: 120000, max: 180000, currency: 'USD' },
        status: 'active'
      },
      {
        employer: employer._id,
        title: 'Frontend Developer',
        description: 'Join our creative team as a Frontend Developer! You\'ll work on building beautiful, responsive user interfaces for our web applications.',
        qualifications: 'Bachelor\'s degree in Computer Science or equivalent\n3+ years of frontend development experience\nExpert knowledge of HTML, CSS, JavaScript\nProficiency in React or Vue.js',
        responsibilities: 'Build responsive and interactive web interfaces\nImplement designs from mockups\nOptimize applications for maximum speed\nCollaborate with designers and backend developers',
        jobType: 'full-time',
        location: { city: 'New York', country: 'USA', remote: false },
        salaryRange: { min: 90000, max: 130000, currency: 'USD' },
        status: 'active'
      },
      {
        employer: employer._id,
        title: 'DevOps Engineer',
        description: 'We\'re seeking a talented DevOps Engineer to help us build and maintain our cloud infrastructure.',
        qualifications: 'Bachelor\'s degree in Computer Science\n4+ years of DevOps experience\nStrong knowledge of AWS or Azure\nExperience with Docker and Kubernetes',
        responsibilities: 'Design and implement CI/CD pipelines\nManage cloud infrastructure\nMonitor system performance\nAutomate operational processes',
        jobType: 'full-time',
        location: { city: 'Austin', country: 'USA', remote: true },
        salaryRange: { min: 110000, max: 160000, currency: 'USD' },
        status: 'active'
      },
      {
        employer: employer._id,
        title: 'Product Manager',
        description: 'Looking for an experienced Product Manager to drive product strategy and execution.',
        qualifications: 'Bachelor\'s degree in Business or Computer Science\n5+ years of product management experience\nProven track record of successful product launches\nStrong analytical skills',
        responsibilities: 'Define product vision and strategy\nCreate and maintain product roadmap\nGather and prioritize requirements\nWork with engineering teams',
        jobType: 'full-time',
        location: { city: 'Seattle', country: 'USA', remote: false },
        salaryRange: { min: 130000, max: 180000, currency: 'USD' },
        status: 'active'
      },
      {
        employer: employer._id,
        title: 'Data Scientist',
        description: 'Join our data team as a Data Scientist! Work on exciting machine learning projects and analyze large datasets.',
        qualifications: 'Master\'s or PhD in Computer Science or Statistics\n3+ years of data science experience\nProficiency in Python and R\nExperience with ML frameworks',
        responsibilities: 'Develop and deploy machine learning models\nAnalyze complex datasets\nCreate data visualizations\nOptimize existing models',
        jobType: 'full-time',
        location: { city: 'Boston', country: 'USA', remote: true },
        salaryRange: { min: 125000, max: 175000, currency: 'USD' },
        status: 'active'
      },
      {
        employer: employer._id,
        title: 'UX/UI Designer',
        description: 'We\'re looking for a creative UX/UI Designer to craft beautiful and intuitive user experiences.',
        qualifications: 'Bachelor\'s degree in Design or HCI\n4+ years of UX/UI design experience\nProficiency in Figma or Adobe XD\nStrong portfolio',
        responsibilities: 'Create wireframes and prototypes\nConduct user research\nDesign intuitive interfaces\nMaintain design systems',
        jobType: 'full-time',
        location: { city: 'Los Angeles', country: 'USA', remote: false },
        salaryRange: { min: 95000, max: 140000, currency: 'USD' },
        status: 'active'
      },
      {
        employer: employer._id,
        title: 'Backend Developer Intern',
        description: 'Great opportunity for students to gain hands-on experience in backend development.',
        qualifications: 'Currently pursuing degree in Computer Science\nBasic programming knowledge\nEager to learn\nGood communication skills',
        responsibilities: 'Assist in developing backend services\nWrite and test code\nParticipate in code reviews\nLearn best practices',
        jobType: 'internship',
        location: { city: 'San Francisco', country: 'USA', remote: false },
        salaryRange: { min: 25000, max: 35000, currency: 'USD' },
        status: 'active'
      },
      {
        employer: employer._id,
        title: 'Mobile App Developer',
        description: 'Seeking a skilled Mobile App Developer to build iOS and Android applications.',
        qualifications: '3+ years of mobile development\nProficiency in React Native or Swift\nExperience with app deployment\nKnowledge of RESTful APIs',
        responsibilities: 'Develop mobile applications\nImplement new features\nOptimize app performance\nPublish apps to stores',
        jobType: 'full-time',
        location: { city: 'Chicago', country: 'USA', remote: true },
        salaryRange: { min: 100000, max: 145000, currency: 'USD' },
        status: 'active'
      },
      {
        employer: employer._id,
        title: 'QA Engineer',
        description: 'Join our QA team to ensure our products meet the highest standards.',
        qualifications: '3+ years of QA experience\nExperience with test automation\nKnowledge of testing methodologies\nGood programming skills',
        responsibilities: 'Design and execute test plans\nWrite automated tests\nReport and track bugs\nImprove testing processes',
        jobType: 'full-time',
        location: { city: 'Denver', country: 'USA', remote: true },
        salaryRange: { min: 85000, max: 120000, currency: 'USD' },
        status: 'active'
      },
      {
        employer: employer._id,
        title: 'Technical Writer',
        description: 'Create clear documentation for our products and work with engineers.',
        qualifications: '2+ years of technical writing\nExcellent writing skills\nAbility to understand technical concepts\nAttention to detail',
        responsibilities: 'Write technical documentation\nCreate user guides\nCollaborate with engineering\nMaintain documentation standards',
        jobType: 'contract',
        location: { city: 'Portland', country: 'USA', remote: true },
        salaryRange: { min: 70000, max: 95000, currency: 'USD' },
        status: 'active'
      }
    ];

    await Job.deleteMany({ employer: employer._id });
    const jobs = await Job.insertMany(sampleJobs);

    res.json({
      success: true,
      message: 'Test jobs created successfully!',
      data: {
        employerEmail: 'testemployer@example.com',
        employerPassword: 'test123',
        companyName: employerProfile.companyName,
        jobsCreated: jobs.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating test jobs',
      error: error.message
    });
  }
});

module.exports = router;
