import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";

/* ================= ADMIN ================= */
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateUser from "./pages/admin/CreateUser";
import CreateStudent from "./pages/admin/CreateStudent";
import CreateFaculty from "./pages/admin/CreateFaculty";
import ManageUsers from "./pages/admin/ManageUsers";
import StudentList from "./pages/admin/manage/StudentList";
import FacultyList from "./pages/admin/manage/FacultyList";
import EditUser from "./pages/admin/EditUser";
import ManageForms from "./pages/admin/ManageForms";
import ManageIssues from "./pages/admin/ManageIssues";
import StudentProfile from "./pages/admin/StudentProfile";
import SystemSettings from "./pages/admin/SystemSettings";
import Announcements from "./pages/admin/Announcements";
import RolePermissions from "./pages/admin/RolePermissions";
import FacultyInfo from "./pages/admin/FacultyInfo";

/* ================= FACULTY ================= */
import FacultyLayout from "./pages/faculty/FacultyLayout";
import FacultyDashboard from "./pages/faculty/Dashboard";
import UploadMarks from "./pages/faculty/UploadMarks";
import UploadAttendance from "./pages/faculty/UploadAttendance";
import ViewRecords from "./pages/faculty/ViewRecords";
import RiskReport from "./pages/faculty/RiskReport";
import FacultyAnnouncements from "./pages/faculty/Announcements";
import AIAnalytics from "./pages/faculty/AIAnalytics";
import FacultyChangePassword from "./pages/faculty/ChangePassword";
import FacultyProfile from "./pages/faculty/Profile";

/* ================= STUDENT ================= */
import StudentLayout from "./pages/student/StudentLayout";
import AdmitCard from "./pages/student/AdmitCard";
import Forms from "./pages/student/Forms";
import Issues from "./pages/student/Issues";
import Training from "./pages/student/Training";
import Calendar from "./pages/student/Calendar";
import Payment from "./pages/student/Payment";
import Dashboard from "./pages/student/Dashboard";
import Attendance from "./pages/student/Attendance";
import Results from "./pages/student/Results";
import ChangePassword from "./pages/student/ChangePassword";
import Feedback from "./pages/student/Feedback";
import Timetable from "./pages/student/Timetable";
import StudentAnnouncements from "./pages/student/Announcements";
import Profile from "./pages/student/Profile";
import Landing from "./pages/landing";
import Marks from "./pages/student/Marks";
import PerformanceDashboard from "./pages/student/PerformanceDashboard";

export default function App() {
  return (
    <BrowserRouter>
      {/* ✅ TOASTER GLOBAL */}
      <Toaster position="top-right" />
      <Routes>
        {/* ================= LOGIN ================= */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        {/* ================= ADMIN ROUTES ================= */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="create-user" element={<CreateUser />} />
          <Route path="create-student" element={<CreateStudent />} />
          <Route path="create-faculty" element={<CreateFaculty />} />
          <Route path="manage-users" element={<ManageUsers />} />
          <Route path="student-list" element={<StudentList />} />
          <Route path="faculty-list" element={<FacultyList />} />
          <Route path="edit-user/:id" element={<EditUser />} />
          <Route path="manage-forms" element={<ManageForms />} />
          <Route path="manage-issues" element={<ManageIssues />} />
          <Route path="student-profile/:id" element={<StudentProfile />} />
          <Route path="faculty-profile/:id" element={<FacultyInfo />} />
          <Route path="system-settings" element={<SystemSettings />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="permissions" element={<RolePermissions />} />
        </Route>

        {/* ================= FACULTY ROUTES ================= */}
        <Route
          path="/faculty"
          element={
            <ProtectedRoute role="faculty">
              <FacultyLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<FacultyDashboard />} />
          <Route path="dashboard" element={<FacultyDashboard />} />
          <Route path="upload-marks" element={<UploadMarks />} />
          <Route path="upload-attendance" element={<UploadAttendance />} />
          <Route path="records" element={<ViewRecords />} />
          <Route path="risk-report" element={<RiskReport />} />
          <Route path="announcements" element={<FacultyAnnouncements />} />
          <Route path="analytics" element={<AIAnalytics />} />
          <Route path="change-password" element={<FacultyChangePassword />} />
          <Route path="profile" element={<FacultyProfile />} />
        </Route>

        {/* ================= STUDENT ROUTES ================= */}
        <Route
          path="/student"
          element={
            <ProtectedRoute role="student">
              <StudentLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="admit-card" element={<AdmitCard />} />
          <Route path="forms" element={<Forms />} />
          <Route path="results" element={<Results />} />
          <Route path="issue" element={<Issues />} />
          <Route path="training" element={<Training />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="payment" element={<Payment />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="timetable" element={<Timetable />} />
          <Route path="announcements" element={<StudentAnnouncements />} />
          <Route path="profile" element={<Profile />} />
          <Route path="marks" element={<Marks />} />
          <Route
            path="/student/performance"
            element={<PerformanceDashboard />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
