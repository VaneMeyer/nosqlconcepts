import React, { useEffect, useState } from "react";
import { Button, Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { checkAuth } from "../api/loginApi";

const SurveyApp = () => {
    const navigate = useNavigate();
      const [isAdmin, setIsAdmin] = useState(false);
      const [isAuthenticated, setIsAuthenticated] = useState(null);

       useEffect(() => {
          const verifyAuth = async () => {
            const authData = await checkAuth();
            setIsAuthenticated(authData !== null);
            if (authData) {
              setIsAdmin(authData.role === "admin");
            }
          };
      
          verifyAuth();
      
          
        }, []);

  return (
    <div>
     <Typography variant='h4'>Survey Tool</Typography>
      {isAdmin && (
        <Button sx={{my:2}} variant="outlined" onClick={() => navigate('/survey-list')}>Edit Survey</Button>
      )}
      {!isAdmin && (
        <Button sx={{my:2}} variant="outlined" onClick={() => navigate('/survey')}>Start Survey</Button>
      )}
    </div>
  );
};

export default SurveyApp;
