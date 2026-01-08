const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const EmployerProfile = require('./models/EmployerProfile');
const Job = require('./models/Job');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Connected to MongoDB');

    // Create test employer user
    let employer = await User.findOne({ email: 'testemployer@example.com' });
    
    if (!employer) {
      employer = await User.create({
        email: 'testemployer@example.com',
        password: 'test123',
        role: 'employer'
      });
      console.log('Created test employer user');
    }

    // Create employer profile
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
      console.log('Created employer profile');
    }

    // Sample jobs data
    const sampleJobs = [
      {
        employer: employer._id,
        title: 'Senior Software Engineer',
        description: 'We are looking for an experienced Senior Software Engineer to join our dynamic team. You will be responsible for designing, developing, and maintaining scalable web applications using modern technologies. This role offers the opportunity to work on cutting-edge projects and mentor junior developers.',
        qualifications: 'Bachelor\'s degree in Computer Science or related field\n5+ years of experience in software development\nProficiency in JavaScript, React, Node.js\nExperience with cloud platforms (AWS, Azure, or GCP)\nStrong problem-solving skills\nExcellent communication abilities',
        responsibilities: 'Design and develop scalable web applications\nWrite clean, maintainable code\nConduct code reviews and mentor junior developers\nCollaborate with cross-functional teams\nParticipate in agile development processes\nTroubleshoot and debug applications',
        jobType: 'full-time',
        location: {
          city: 'San Francisco',
          country: 'USA',
          remote: true
        },
        salaryRange: {
          min: 120000,
          max: 180000,
          currency: 'USD'
        },
        status: 'active'
      },
      {
        employer: employer._id,
        title: 'Frontend Developer',
        description: 'Join our creative team as a Frontend Developer! You\'ll work on building beautiful, responsive user interfaces for our web applications. We value innovation, creativity, and attention to detail.',
        qualifications: 'Bachelor\'s degree in Computer Science or equivalent experience\n3+ years of frontend development experience\nExpert knowledge of HTML, CSS, JavaScript\nProficiency in React or Vue.js\nExperience with responsive design\nUnderstanding of UI/UX principles',
        responsibilities: 'Build responsive and interactive web interfaces\nImplement designs from mockups and wireframes\nOptimize applications for maximum speed\nCollaborate with designers and backend developers\nEnsure cross-browser compatibility\nWrite unit and integration tests',
        jobType: 'full-time',
        location: {
          city: 'New York',
          country: 'USA',
          remote: false
        },
        salaryRange: {
          min: 90000,
          max: 130000,
          currency: 'USD'
        },
        status: 'active'
      },
      {
        employer: employer._id,
        title: 'DevOps Engineer',
        description: 'We\'re seeking a talented DevOps Engineer to help us build and maintain our cloud infrastructure. You\'ll work with cutting-edge technologies and help shape our deployment processes.',
        qualifications: 'Bachelor\'s degree in Computer Science or related field\n4+ years of DevOps experience\nStrong knowledge of AWS or Azure\nExperience with Docker and Kubernetes\nProficiency in CI/CD tools (Jenkins, GitLab CI, GitHub Actions)\nScripting skills (Python, Bash, or similar)',
        responsibilities: 'Design and implement CI/CD pipelines\nManage cloud infrastructure and deployments\nMonitor system performance and reliability\nAutomate operational processes\nImplement security best practices\nCollaborate with development teams',
        jobType: 'full-time',
        location: {
          city: 'Austin',
          country: 'USA',
          remote: true
        },
        salaryRange: {
          min: 110000,
          max: 160000,
          currency: 'USD'
        },
        status: 'active'
      },
      {
        employer: employer._id,
        title: 'Product Manager',
        description: 'Looking for an experienced Product Manager to drive product strategy and execution. You\'ll work closely with engineering, design, and business teams to deliver exceptional products.',
        qualifications: 'Bachelor\'s degree in Business, Computer Science, or related field\n5+ years of product management experience\nProven track record of successful product launches\nStrong analytical and problem-solving skills\nExcellent communication and leadership abilities\nExperience with agile methodologies',
        responsibilities: 'Define product vision and strategy\nCreate and maintain product roadmap\nGather and prioritize requirements\nWork with engineering teams on implementation\nAnalyze market trends and user feedback\nTrack product metrics and KPIs',
        jobType: 'full-time',
        location: {
          city: 'Seattle',
          country: 'USA',
          remote: false
        },
        salaryRange: {
          min: 130000,
          max: 180000,
          currency: 'USD'
        },
        status: 'active'
      },
      {
        employer: employer._id,
        title: 'Data Scientist',
        description: 'Join our data team as a Data Scientist! You\'ll work on exciting machine learning projects, analyze large datasets, and help drive data-driven decision making across the organization.',
        qualifications: 'Master\'s or PhD in Computer Science, Statistics, or related field\n3+ years of data science experience\nProficiency in Python and R\nExperience with machine learning frameworks (TensorFlow, PyTorch)\nStrong statistical analysis skills\nExperience with big data technologies',
        responsibilities: 'Develop and deploy machine learning models\nAnalyze complex datasets to extract insights\nCollaborate with stakeholders to understand business needs\nCreate data visualizations and reports\nOptimize and improve existing models\nStay current with latest ML/AI trends',
        jobType: 'full-time',
        location: {
          city: 'Boston',
          country: 'USA',
          remote: true
        },
        salaryRange: {
          min: 125000,
          max: 175000,
          currency: 'USD'
        },
        status: 'active'
      },
      {
        employer: employer._id,
        title: 'UX/UI Designer',
        description: 'We\'re looking for a creative UX/UI Designer to craft beautiful and intuitive user experiences. You\'ll work on various projects from web applications to mobile apps.',
        qualifications: 'Bachelor\'s degree in Design, HCI, or related field\n4+ years of UX/UI design experience\nProficiency in Figma, Sketch, or Adobe XD\nStrong portfolio demonstrating design skills\nUnderstanding of user-centered design principles\nExperience with design systems',
        responsibilities: 'Create wireframes, mockups, and prototypes\nConduct user research and usability testing\nDesign intuitive user interfaces\nCollaborate with developers and product managers\nMaintain and evolve design systems\nPresent designs to stakeholders',
        jobType: 'full-time',
        location: {
          city: 'Los Angeles',
          country: 'USA',
          remote: false
        },
        salaryRange: {
          min: 95000,
          max: 140000,
          currency: 'USD'
        },
        status: 'active'
      },
      {
        employer: employer._id,
        title: 'Backend Developer Intern',
        description: 'Great opportunity for students or recent graduates to gain hands-on experience in backend development. You\'ll work with experienced engineers and contribute to real projects.',
        qualifications: 'Currently pursuing or recently completed degree in Computer Science\nBasic knowledge of programming (Python, Java, or Node.js)\nUnderstanding of databases and APIs\nEager to learn and grow\nGood communication skills\nAbility to work in a team',
        responsibilities: 'Assist in developing backend services\nWrite and test code under supervision\nParticipate in code reviews\nLearn best practices and coding standards\nCollaborate with team members\nDocument code and processes',
        jobType: 'internship',
        location: {
          city: 'San Francisco',
          country: 'USA',
          remote: false
        },
        salaryRange: {
          min: 25000,
          max: 35000,
          currency: 'USD'
        },
        status: 'active'
      },
      {
        employer: employer._id,
        title: 'Mobile App Developer',
        description: 'Seeking a skilled Mobile App Developer to build and maintain our iOS and Android applications. You\'ll work with React Native or native technologies to create amazing mobile experiences.',
        qualifications: 'Bachelor\'s degree in Computer Science or related field\n3+ years of mobile development experience\nProficiency in React Native, Swift, or Kotlin\nExperience with mobile app deployment\nUnderstanding of mobile UI/UX best practices\nKnowledge of RESTful APIs',
        responsibilities: 'Develop and maintain mobile applications\nImplement new features and improvements\nOptimize app performance\nFix bugs and resolve issues\nCollaborate with designers and backend team\nPublish apps to App Store and Play Store',
        jobType: 'full-time',
        location: {
          city: 'Chicago',
          country: 'USA',
          remote: true
        },
        salaryRange: {
          min: 100000,
          max: 145000,
          currency: 'USD'
        },
        status: 'active'
      },
      {
        employer: employer._id,
        title: 'QA Engineer',
        description: 'Join our quality assurance team to ensure our products meet the highest standards. You\'ll design test plans, automate tests, and work closely with developers.',
        qualifications: 'Bachelor\'s degree in Computer Science or related field\n3+ years of QA experience\nExperience with test automation tools (Selenium, Cypress)\nKnowledge of testing methodologies\nStrong attention to detail\nGood programming skills (JavaScript, Python)',
        responsibilities: 'Design and execute test plans\nWrite automated tests\nPerform manual testing when needed\nReport and track bugs\nCollaborate with development team\nImprove testing processes',
        jobType: 'full-time',
        location: {
          city: 'Denver',
          country: 'USA',
          remote: true
        },
        salaryRange: {
          min: 85000,
          max: 120000,
          currency: 'USD'
        },
        status: 'active'
      },
      {
        employer: employer._id,
        title: 'Technical Writer',
        description: 'We need a Technical Writer to create clear and comprehensive documentation for our products. You\'ll work with engineers to understand complex technical concepts and translate them into user-friendly content.',
        qualifications: 'Bachelor\'s degree in English, Communications, or related field\n2+ years of technical writing experience\nExcellent writing and editing skills\nAbility to understand technical concepts\nExperience with documentation tools\nAttention to detail',
        responsibilities: 'Write and maintain technical documentation\nCreate user guides and tutorials\nCollaborate with engineering teams\nReview and edit content\nMaintain documentation standards\nUpdate existing documentation',
        jobType: 'contract',
        location: {
          city: 'Portland',
          country: 'USA',
          remote: true
        },
        salaryRange: {
          min: 70000,
          max: 95000,
          currency: 'USD'
        },
        status: 'active'
      }
    ];

    // Clear existing jobs for this employer (optional)
    await Job.deleteMany({ employer: employer._id });
    console.log('Cleared existing test jobs');

    // Insert sample jobs
    const jobs = await Job.insertMany(sampleJobs);
    console.log(`Successfully created ${jobs.length} test jobs`);

    console.log('\n=== Seed Data Summary ===');
    console.log(`Employer Email: testemployer@example.com`);
    console.log(`Employer Password: test123`);
    console.log(`Company: ${employerProfile.companyName}`);
    console.log(`Jobs Created: ${jobs.length}`);
    console.log('\nYou can now login with the employer account to manage these jobs,');
    console.log('or browse them as a job seeker!');
    console.log('========================\n');

    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
