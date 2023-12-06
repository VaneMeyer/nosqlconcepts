import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { Link } from "react-router-dom";
import ProgressStatus from "./progressStatus";
import ProgressCircle from "./ProgressCircle";


const StatBox = ({ title, subtitle, icon, progress, increase, link, logo }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {title}
          </Typography>
        </Box>
        <Box>
          {/* <ProgressStatus title={title} /> */}
          <ProgressCircle title={title}/>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
          {subtitle}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: colors.greenAccent[100] }} //600
        >
          {increase}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        {/* //Testphase DBMS Link and Button attributes */}
        <Link to={/* title === "PostgreSQL" ||  (title === "Neo4J" || title === "MongoDB") &&*/ link}>
          <Button
           /*  disabled={
              title === "Cassandra" ||
               title === "MongoDB" || 
              title === "PostgreSQL"
            } */
            sx={{
              backgroundColor: colors.blueAccent[100],
              color: colors.grey[900],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            Start
          </Button>
          
        </Link>
        {/* <Box>
          <img src={logo} alt="database logo" width="50%" height="auto" />
        </Box> */}
      </Box>
    </Box>
  );
};

export default StatBox;
