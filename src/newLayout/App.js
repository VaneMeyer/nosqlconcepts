import React, { useState, useEffect } from "react";
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
    /* { path: "/test", element: <TutorialAndQuiz /> }, */
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
import DownloadButton from "./components/downloadButton";
import TutorialAndQuiz from "./scenes/tutorial.jsx";

const PrivateRoute = ({ element, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? element : <Navigate to="/sign-in" />;
};

const AdminRoute = ({ element, isAdmin, ...rest }) => {
  return isAdmin ? element : <Navigate to="/" />;
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

const AppRoutes = ({ assignments, isAdmin }) => {
  const routes = [
    { path: "/", element: <PrivateRoute element={<Dashboard />} /> },
    { path: "/history", element: <PrivateRoute element={<HistoryC />} /> },
    { path: "/my-data", element: <PrivateRoute element={<MyData />} /> },
    { path: "/statistics", element: <PrivateRoute element={<Statistics />} /> },
    {
      path: "/manage-users",
      element: <AdminRoute element={<ManageUsers />} isAdmin={isAdmin} />,
    },
    {
      path: "/manage-exercises",
      element: <AdminRoute element={<ManageExercises />} isAdmin={isAdmin} />,
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
    if (localStorage.getItem("role") === "admin") {
      setIsAdmin(true);
    }
    const loadAssignments = async () => {
      try {
        const response = await fetchAssignments();
        setAssignments(response);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    loadAssignments();
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