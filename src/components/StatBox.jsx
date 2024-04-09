import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { Link } from "react-router-dom";
import ProgressStatus from "./progressStatus";
import ProgressCircle from "./ProgressCircle";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";

const StatBox = ({ title, subtitle, icon, progress, increase, link, logo }) => {
  //################# Style Settings ######################################################
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //################# Frontend ######################################################
  return (
    <Box /* width="100%" m="0 30px" */ >
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {icon} {title}
          </Typography>
          <Typography variant="h5" sx={{ color: colors.primary[500] }}>
            START working on your {title} tasks.
          </Typography>
        </Box>
        <Box>
          <ProgressCircle title={title} />
        </Box>
      </Box>

      <Box display="flex" justifyContent="space-between">
        {/* //Testphase DBMS Link and Button attributes */}
        <Link
          to={
             (title === "PostgreSQL") && link
          }
        >
          <Button
              disabled={
              title === "Cassandra" ||
               title === "MongoDB" || 
              title === "Neo4J" ||
              title === "Lab Assignment 1" ||
              title === "Lab Assignment 2"
            } 
            sx={{
              backgroundColor: colors.custom01[100],
              color: colors.grey[900],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            variant="contained"
            area-aria-label="Start Tasks"
          >
            Start
            <PlayCircleFilledWhiteIcon></PlayCircleFilledWhiteIcon>
          </Button>
        </Link>
        <ProgressStatus title={title} />
      </Box>
    </Box>
  );
};

export default StatBox;
