import React, {
  useState,
  useEffect,
  memo,
  createContext,
  useContext,
} from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import TopBar from "./global/topbar.jsx";
import Footer from "./global/footer.jsx";
import ManageExercises from "./components/adminComponents/manageExercises.jsx";
import SignIn from "./Auth/login.jsx";
import { fetchAssignments } from "./api/adminApi.js";
import { checkAuth } from "./api/loginApi.js";
import DownloadButton from "./components/exerciseSheetComponents/downloadButton.jsx";
import Conditions from "./components/otherComponents/conditions.jsx";
import DatabaseTutorials from "./pages/tutorial.jsx";
import SurveyApp from "./pages/survey.jsx";
import SurveyList from "./components/surveyComponents/SurveyList.js";
import Survey from "./components/surveyComponents/Survey.js";
import EditSurvey from "./components/surveyComponents/EditSurvey.js";
import FillOutSurvey from "./components/surveyComponents/FillOutSurvey.js";
import SurveyResults from "./components/surveyComponents/SurveyResults.js";
import ExerciseSheetC from "./pages/exerciseSheet.jsx";
import NewDashboard from "./pages/dashboard.jsx";
import NewStatistics from "./pages/statistics.jsx";
import UserProfile from "./pages/userProfile.jsx";
import AdminPage from "./pages/adminPage.jsx";
import NewInformationC from "./pages/information.jsx";


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authStatus, setAuthStatus] = useState({
    isAuthenticated: null,
    isAdmin: false,
  });

  useEffect(() => {
    const verifyAuth = async () => {
      const authData = await checkAuth();
      setAuthStatus({
        isAuthenticated: authData !== null,
        isAdmin: authData?.role === "admin",
        username: authData?.username,
      });
    };
    verifyAuth();
  }, []);

  return (
    <AuthContext.Provider value={authStatus}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

const ProtectedRoute = ({ element, isAdminRoute }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (isAuthenticated === null) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/sign-in" />;
  if (isAdminRoute && !isAdmin) return <Navigate to="/" />;

  return element;
};

// ErrorBoundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in ErrorBoundary: ", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

// Routes component
const AppRoutes = ({ assignments }) => {
  const routes = [
    { path: "/", element: <ProtectedRoute element={<NewDashboard />} /> },
    { path: "/userprofile", element: <ProtectedRoute element={<UserProfile />} /> },
    /* { path: "/history", element: <ProtectedRoute element={<HistoryC />} /> },
    { path: "/my-data", element: <ProtectedRoute element={<MyData />} /> }, */
    {
      path: "/statistics",
      element: <ProtectedRoute element={<NewStatistics />} />,
    },
    {
      path: "/manage-users",
      element: <ProtectedRoute element={<AdminPage />} isAdminRoute />,
    },
 /*    {
      path: "/manage-users",
      element: <ProtectedRoute element={<ManageUsers />} isAdminRoute />,
    }, */
    {
      path: "/manage-exercises",
      element: <ProtectedRoute element={<ManageExercises />} isAdminRoute />,
    },
    {
      path: "/information",
      element: <ProtectedRoute element={<NewInformationC />} />,
    },
    {
      path: "/download",
      element: <ProtectedRoute element={<DownloadButton />} />,
    },
    {
      path: "/survey-home",
      element: <ProtectedRoute element={<SurveyApp />} />,
    }, //TODO
    {
      path: "/survey-list",
      element: <ProtectedRoute element={<SurveyList />} />,
    },
    { path: "/survey", element: <ProtectedRoute element={<Survey />} /> },
    {
      path: "/edit-survey",
      element: <ProtectedRoute element={<EditSurvey />} />,
    },
    {
      path: "/fill-out-survey",
      element: <ProtectedRoute element={<FillOutSurvey />} />,
    },
    {
      path: "/survey-results",
      element: <ProtectedRoute element={<SurveyResults />} />,
    },
    { path: "/sign-in", element: <SignIn /> },
    { path: "/conditions", element: <Conditions /> },
    /* { path: "/tutorial", element: <DatabaseTutorials /> }, */
    //lokal testen
  /*   { path: "/test-exercise", element: <ExerciseSheetC/> },
    { path: "/test-dashboard", element: <NewDashboard/> },
    { path: "/test-statistics", element: <NewStatistics/> },
    { path: "/test-userprofile", element: <UserProfile/> },
    { path: "/test-adminpage", element: <AdminPage/> }, */
    //test online
   /*  {
      path: "/test-exercise",
      element: <ProtectedRoute element={<ExerciseSheetC />} isAdminRoute />,
    },
    {
      path: "/test-dashboard",
      element: <ProtectedRoute element={<NewDashboard/>} isAdminRoute />,
    },
    {
      path: "/test-statistics",
      element: <ProtectedRoute element={<NewStatistics/>} isAdminRoute />,
    },
    {
      path: "/test-userprofile",
      element: <ProtectedRoute element={<UserProfile/>} isAdminRoute />,
    },
    {
      path: "/test-adminpage",
      element: <ProtectedRoute element={<AdminPage/>} isAdminRoute />,
    }, */

    { path: "*", element: <Navigate to="/" /> },
  ];

  assignments
    .filter((assignment) => assignment.is_active)
    .forEach((assignment) => {
      routes.push({
        path: assignment.link,
        element: (
          <ProtectedRoute
            element={
              <ExerciseSheetC
                area_id={assignment.area_id}
                area_name={assignment.area_name}
                endpoint={assignment.endpoint}
                feedback_on={assignment.feedback_on}
              />
            }
          />
        ),
      });
    });

  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
};

// Main app component
const AppNewLayout = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    document.title = "NoSQLconcepts";

    const loadAssignments = async () => {
      try {
        const response = await fetchAssignments();
        setAssignments(response);
      } catch (error) {
        console.error("Error loading assignments:", error);
      }
    };

    loadAssignments();
  }, []);

  return (
    <AuthProvider>
      <div className="app">
        <main className="content">
          <Router>
            <MemoizedTopBar />
            <ErrorBoundary>
              <AppRoutes assignments={assignments} />
            </ErrorBoundary>
            <MemoizedFooter />
          </Router>
        </main>
      </div>
    </AuthProvider>
  );
};

// Memoized components
const MemoizedTopBar = memo(TopBar);
const MemoizedFooter = memo(Footer);

export { useAuth };
export default AppNewLayout;

/* import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import TopBar from "./global/topbar";
import Footer from "./global/footer";
import ExerciseSheet from "./scenes/exerciseSheet";
import HistoryC from "./scenes/history";
import MyData from "./scenes/myData";
import Statistics from "./scenes/statistics";
import ManageUsers from "./admin/manageUsers";
import ManageExercises from "./admin/manageExercises";
import InformationC from "./scenes/information";
import SignIn from "./Login/login";
import { fetchAssignments } from "./api/adminApi";
import { checkAuth } from "./api/loginApi.js";
import DownloadButton from "./components/downloadButton";
import TutorialAndQuiz from "./scenes/tutorial.jsx";
import Conditions from "./components/conditions.jsx";
import DatabaseTutorials from "./scenes/tutorial.jsx";

const PrivateRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const verifyAuth = async () => {
      const authData = await checkAuth();
      setIsAuthenticated(authData !== null);
    };

    verifyAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? element : <Navigate to="/sign-in" />;
};

const AdminRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      const authData = await checkAuth();
      setIsAuthenticated(authData !== null);
      if (authData) {
        setIsAdmin(authData.role === 'admin');
      }
    };

    verifyAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated && isAdmin ? element : <Navigate to="/" />;
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

const AppRoutes = ({ assignments }) => {
  const routes = [
    { path: "/", element: <PrivateRoute element={<Dashboard />} /> },
    { path: "/history", element: <PrivateRoute element={<HistoryC />} /> },
    { path: "/my-data", element: <PrivateRoute element={<MyData />} /> },
    { path: "/statistics", element: <PrivateRoute element={<Statistics />} /> },
    {
      path: "/manage-users",
      element: <AdminRoute element={<ManageUsers />} />,
    },
    {
      path: "/manage-exercises",
      element: <AdminRoute element={<ManageExercises />} />,
    },
    {
      path: "/information",
      element: <PrivateRoute element={<InformationC />} />,
    },
    {
      path: "/download",
      element: <PrivateRoute element={<DownloadButton />} />,
    },
    { path: "/sign-in", element: <SignIn /> },
    { path: "/conditions", element: <Conditions /> },
    { path: "/tutorial", element: <DatabaseTutorials /> },
    { path: "*", element: <Navigate to="/" /> },
    
  ];

  assignments.forEach((assignment) => {
    if (assignment.is_active) {
      routes.push({
        path: assignment.link,
        element: (
          <PrivateRoute
            element={
              <ExerciseSheet
                area_id={assignment.area_id}
                area_name={assignment.area_name}
                endpoint={assignment.endpoint}
                feedback_on={assignment.feedback_on}
              />
            }
          />
        ),
      });
    }
  });

  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
};

function AppNewLayout() {
  const [assignments, setAssignments] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    document.title = "NoSQLconcepts";
    const loadAssignments = async () => {
      try {
        const response = await fetchAssignments();
        setAssignments(response);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const verifyAuth = async () => {
      const authData = await checkAuth();
      setIsAdmin(authData?.role === 'admin');
    };

    loadAssignments();
    verifyAuth();
    
   
  }, []);

  return (
    <div className="app">
      <main className="content">
        <Router>
          <TopBar />
          <ErrorBoundary>
            <AppRoutes assignments={assignments} isAdmin={isAdmin} />
          </ErrorBoundary>
        </Router>
        <Footer />
      </main>
    </div>
  );
}

export default AppNewLayout;

 */
