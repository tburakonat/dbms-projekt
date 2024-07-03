import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import ResetPassword from "./pages/reset-password";
import CreatePassword from "./pages/create-password";
import Layout from "./pages/layout";
import AnonymousRoute from "./components/anonymous-route";
import Me from "./pages/me";
import CourseList from "./components/CourseList";
import CoursePage from "./components/CoursePage";
import CreateCourse from "./components/CreateCourse";
import ProtectedRoute from "./components/protected-route";
import AdminDashboard from "./pages/admin-dashboard";
import TeacherDashboard from "./pages/teacher-dashboard";
import NotFound from "./pages/not-found";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <AnonymousRoute>
                <Login />
              </AnonymousRoute>
            }
          />
          <Route
            path="/register"
            element={
              <AnonymousRoute>
                <Register />
              </AnonymousRoute>
            }
          />
          <Route
            path="/me"
            element={
              <ProtectedRoute roles={["student", "teacher", "admin"]}>
                <Me />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courselist"
            element={
              <ProtectedRoute roles={["student", "teacher", "admin"]}>
                <CourseList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/course/:id"
            element={
              <ProtectedRoute roles={["student", "teacher", "admin"]}>
                <CoursePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/createCourse"
            element={
              <ProtectedRoute roles={["teacher", "admin"]}>
                <CreateCourse />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute roles={["teacher", "admin"]}>
                <CreateCourse />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher-dashboard"
            element={
              <ProtectedRoute roles={["teacher"]}>
                <TeacherDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/create-password/:token" element={<CreatePassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster position="bottom-center" />
      </Layout>
    </Router>
  );
}

export default App;
