import { Button} from "@mui/material";
import { Link } from "react-router-dom";
import { handleLogout } from "../api/auth";

const LogOut = () => {
  
  const handleLogoutClick = async () => {
    const loggedOut = await handleLogout();
    if (loggedOut) {
      
      window.location.reload(); 
    } else {
      
      alert("Error during logout. Please try again.");
    }
  };

  return (
    <Link to="/" replace style={{ textDecoration: "none" }}>
      <Button
       
        onClick={handleLogoutClick}
        aria-label="Logout"
      >
        Logout
      </Button>
    </Link>
  );
};

export default LogOut;
