import axios from 'axios';

const API_URL = '/api';

export const handleLogin = async (username, password, setIsLoggedIn, setUser, setRole, navigate, setErrorMessage) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    }, { withCredentials: true }); 

    setIsLoggedIn(true);
    setUser(response.data.user_name);
    setRole(response.data.role);

    navigate("/"); 
    window.location.reload();
  } catch (error) {
    console.log(error);
    setIsLoggedIn(false);
    setErrorMessage(
      "Connection failed. Please check your username and password again or ask your tutors for help."
    );
  }
};

export const handleLogout = async () => {
  try {
    const response = await axios.get(`${API_URL}/logout`, { withCredentials: true }); // Cookies mit Anfragen senden
    if (response.status === 200) {
      return true;
    } else {
      console.error("Fehler beim Abmelden: Statuscode", response.status);
      return false;
    }
  } catch (error) {
    console.error("Fehler beim Abmelden:", error);
    return false;
  }
};


export const checkAuth = async () => {
  try {
    const response = await axios.get(`${API_URL}/check-auth`, { withCredentials: true }); // Cookies mit Anfragen senden
    if (response.status === 200) {
     
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Fehler beim Authentifizierungscheck:", error);
    return null;
  }
};


/* import axios from 'axios';

const API_URL = '/api';
export const handleLogin = async (username, password, setIsLoggedIn, setUser, setRole, navigate, setErrorMessage) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    setIsLoggedIn(true);
    setUser(response.data.user_name);
    setRole(response.data.role);
    localStorage.setItem("token", JSON.stringify(response.data.user_name));
    localStorage.setItem("role", response.data.role);

    navigate("/"); // Navigate to the dashboard
    window.location.reload();
  } catch (error) {
    console.log(error);
    setIsLoggedIn(false);
    setErrorMessage(
      "Connection failed. Please check your username and password again or ask your tutors for help."
    );
  }
};
export const handleLogout = async () => {
    try {
      const response = await axios.get(`${API_URL}/logout`);
      if (response.status === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        return true; 
      } else {
        console.error("Fehler beim Abmelden: Statuscode", response.status);
        return false; 
      }
    } catch (error) {
      console.error("Fehler beim Abmelden:", error);
      return false; 
    }
  };
 */