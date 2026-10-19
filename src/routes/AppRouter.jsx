import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CandidateLayout from "../components/layout/CandidateLayout";
import ManagerLayout from "../components/layout/ManagerLayout";
import ProtectedRoute from "./ProtectedRoute";
import ManagerRoute from "./ManagerRoute";

import Landing from "../pages/Landing";
import Jobs from "../pages/Jobs";
import JobDetail from "../pages/JobDetail";
import Login from "../pages/Login";
import ManagerLogin from "../pages/ManagerLogin";
import Register from "../pages/Register";
import Applications from "../pages/Applications";

import Dashboard from "../pages/manager/Dashboard";
import JobManagement from "../pages/manager/JobManagement";
import JobApplicants from "../pages/manager/JobApplicants";
import AiAnalysis from "../pages/manager/AiAnalysis";

const router = createBrowserRouter([
  {
    element: <CandidateLayout />,
    children: [
      { path: "/", element: <Landing /> },
      { path: "/jobs", element: <Jobs /> },
      { path: "/jobs/:id", element: <JobDetail /> },
      { path: "/login", element: <Login /> },
      { path: "/manager/login", element: <ManagerLogin /> },
      { path: "/register", element: <Register /> },
      // TODO: Re-enable ProtectedRoute once backend auth is ready
      { path: "/applications", element: <Applications /> },
    ],
  },
  {
    // TODO: Re-enable ManagerRoute guard once backend auth is ready
    // element: (
    //   <ManagerRoute>
    //     <ManagerLayout />
    //   </ManagerRoute>
    // ),
    element: <ManagerLayout />,
    children: [
      { path: "/manager", element: <Dashboard /> },
      { path: "/manager/jobs", element: <JobManagement /> },
      { path: "/manager/jobs/:jobId/applicants", element: <JobApplicants /> },
      {
        path: "/manager/applicants/:applicationId",
        element: <AiAnalysis />,
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
