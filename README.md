Smart Academic Tracker

A full-stack AI-powered academic management system designed to streamline student performance tracking, faculty operations, and administrative workflows.

Overview

Smart Academic Tracker is a modern web-based system built to digitize and optimize academic management in educational institutions.

The platform provides role-based dashboards for:

Admin
Faculty
Students

It also integrates AI-based risk prediction to identify students who require academic attention.

Key Features
Admin Panel
Create and manage students and faculty
View analytics dashboard
Manage examination forms
Handle student issues
Publish announcements
Role-based access control
Faculty Panel
Upload marks
Upload attendance
View student records
Performance analytics
AI risk monitoring
Manage announcements
Student Panel
View academic dashboard
Check marks and attendance
Performance analytics (charts)
Apply for exams
Download admit cards (PDF)
Raise issues
View announcements
AI Risk Prediction

The system includes an intelligent risk detection model based on:

Marks
Attendance
Risk Levels
High Risk
Medium Risk
Low Risk

Students receive smart suggestions for improvement.

Tech Stack
Frontend
React.js (Vite)
Tailwind CSS
Recharts
Axios
React Router DOM
Backend
Node.js
Express.js
MongoDB (Mongoose)
Authentication
JWT (JSON Web Token)
Role-Based Access Control
System Architecture

Client (React)
→ API (Express)
→ Database (MongoDB)

Project Structure
SmartAcademicTracker/
│
├── frontend/
│   ├── src/
│   ├── pages/
│   ├── components/
│
├── backend/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│
└── README.md
Installation & Setup
1. Clone the Repository
git clone https://github.com/aditya-7898/BCA_SmartAcademicTracker_AdityaDhakar
cd BCA_SmartAcademicTracker_AdityaDhakar
2. Backend Setup
cd backend
npm install
npm run dev
3. Frontend Setup
cd frontend
npm install
npm run dev
Environment Variables

Create a .env file inside the backend/ directory:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
API Endpoints
Authentication
POST /api/auth/login
GET /api/auth/me
Admin
GET /api/admin/students
GET /api/admin/faculty
POST /api/admin/create-student
Faculty
GET /api/faculty/students
POST /api/performance/add-marks
POST /api/performance/add-attendance
Screenshots

Add screenshots inside a screenshots/ folder:

Future Enhancements
Online PTM (Parent-Teacher Meeting system)
Email notifications
OTP verification
Mobile application
Advanced AI prediction models
Export reports (PDF/Excel)
Real-time notifications
Learning Outcomes

This project demonstrates:

Full-stack development
REST API design
Role-based authentication
UI/UX design principles
AI-based decision systems
Real-world application architecture
Authors

Aditya Dhakar
Anurag Singh Rana
Ajay Yadav

BCA Students
ITM University, Gwalior

License

This project is intended for academic and educational purposes.

Support

If you find this project useful:

Star the repository
Share it with others
