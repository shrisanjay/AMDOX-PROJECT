# Job Listing Portal

A full-stack job listing portal that connects job seekers with employers. Built with Node.js, Express, MongoDB, and vanilla JavaScript with a premium modern UI.

## Features

### For Job Seekers
- ✅ User registration and authentication
- ✅ Create and manage profile
- ✅ Upload resume (PDF, DOC, DOCX)
- ✅ Browse and search job listings
- ✅ Advanced filters (job type, location, salary range)
- ✅ Apply for jobs with cover letter
- ✅ Track application status
- ✅ Dashboard with application statistics

### For Employers
- ✅ Company profile management
- ✅ Create, edit, and delete job listings
- ✅ View and manage applications
- ✅ Update application status (shortlist, accept, reject)
- ✅ Dashboard with job and application statistics

### Technical Features
- 🔐 Secure JWT authentication
- 🔒 Password hashing with bcrypt
- 📁 File upload support for resumes
- 🎨 Professional corporate light mode UI
- ✨ Refined glassmorphism (where appropriate)
- 📱 Fully responsive design
- ⚡ Real-time updates
- 🔍 Advanced search and filtering

## Tech Stack

**Backend:**
- Node.js
- Express.js
- MongoDB (Atlas or Local)
- JWT for authentication
- Multer for file uploads
- bcryptjs for password hashing

**Frontend:**
- HTML5 / Vanilla JavaScript
- Modern CSS (Professional Light Mode theme)
- Google Fonts (Inter)
- Custom animations and transitions

## Recent Updates

### Professional Light Mode Overhaul
The platform has been upgraded from its original dark theme to a professional, corporate-grade light mode. This design system prioritizes trust, clarity, and readability, featuring:
- A clean blue and white palette (`#2563EB` primary).
- Generous whitespace and a clear typography hierarchy.
- Conservative use of glassmorphism for a premium SaaS aesthetic.
- Completely updated dashboard, job search, and management interfaces.

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)

### Setup Steps

1. **Clone or navigate to the project directory:**
   ```bash
   cd "d:\Desktop\AMDOX TECH\job-listing-portal"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   
   Edit the `.env` file and update the following:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/job-listing-portal
   JWT_SECRET=your_jwt_secret_key_change_this_in_production_12345
   JWT_EXPIRE=7d
   ```

4. **Start MongoDB:**
   
   Make sure MongoDB is running on your system:
   ```bash
   mongod
   ```

5. **Start the server:**
   ```bash
   npm start
   ```
   
   For development with auto-restart:
   ```bash
   npm run dev
   ```

6. **Access the application:**
   
   Open your browser and navigate to:
   ```
   http://localhost:5000
   ```

## Project Structure

```
job-listing-portal/
├── models/              # MongoDB models
│   ├── User.js
│   ├── JobSeekerProfile.js
│   ├── EmployerProfile.js
│   ├── Job.js
│   └── Application.js
├── routes/              # API routes
│   ├── auth.js
│   ├── profiles.js
│   ├── jobs.js
│   └── applications.js
├── middleware/          # Custom middleware
│   ├── auth.js
│   └── upload.js
├── public/              # Frontend files
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── api.js
│   │   └── utils.js
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── jobseeker-dashboard.html
│   ├── employer-dashboard.html
│   ├── profile.html
│   ├── jobs.html
│   ├── job-details.html
│   ├── create-job.html
│   └── applications.html
├── uploads/             # Uploaded files (resumes)
├── server.js            # Main server file
├── package.json
└── .env                 # Environment variables

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Profiles
- `GET /api/profiles/jobseeker/:userId` - Get job seeker profile
- `POST /api/profiles/jobseeker` - Create/update job seeker profile
- `POST /api/profiles/jobseeker/resume` - Upload resume
- `GET /api/profiles/employer/:userId` - Get employer profile
- `POST /api/profiles/employer` - Create/update employer profile

### Jobs
- `GET /api/jobs` - Get all jobs (with filters)
- `GET /api/jobs/:id` - Get single job
- `POST /api/jobs` - Create job (employer only)
- `PUT /api/jobs/:id` - Update job (employer only)
- `DELETE /api/jobs/:id` - Delete job (employer only)
- `GET /api/jobs/employer/:employerId` - Get employer's jobs

### Applications
- `POST /api/applications` - Apply for job (job seeker only)
- `GET /api/applications/jobseeker` - Get job seeker's applications
- `GET /api/applications/job/:jobId` - Get applications for a job (employer only)
- `PUT /api/applications/:id/status` - Update application status (employer only)

## Usage Guide

### For Job Seekers

1. **Register** - Create an account as a "Job Seeker"
2. **Complete Profile** - Add your personal information, skills, and upload your resume
3. **Browse Jobs** - Search and filter jobs based on your preferences
4. **Apply** - Click "Apply Now" and optionally add a cover letter
5. **Track Applications** - Monitor your application status in the dashboard

### For Employers

1. **Register** - Create an account as an "Employer"
2. **Complete Company Profile** - Add company information
3. **Post Jobs** - Create detailed job listings
4. **Manage Applications** - Review candidates and update application status
5. **Track Performance** - View statistics in your dashboard

## Security Features

- Passwords are hashed using bcrypt
- JWT tokens for secure authentication
- Protected routes with authentication middleware
- Role-based access control
- Input validation on all forms
- File type and size restrictions for uploads

## Future Enhancements

- Email notifications
- Advanced candidate search for employers
- Job recommendations based on profile
- Chat/messaging system
- Application analytics
- Social media integration
- Cloud storage for resumes (AWS S3)

## License

ISC

## Support

For issues or questions, please contact the development team.
```

