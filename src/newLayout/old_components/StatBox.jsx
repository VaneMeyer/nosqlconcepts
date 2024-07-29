import { Box, Button, Typography } from "@mui/material";
/* import { tokens } from "../theme"; */
import { Link } from "react-router-dom";
/* import ProgressStatus from "./progressStatus";
import ProgressCircle from "./ProgressCircle"; */
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";

const StatBox = ({ title, subtitle, icon, progress, increase, link, logo }) => {

  //################# Frontend ######################################################
  return (
    <Box /* width="100%" m="0 30px" */ >
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{  }}
          >
            {icon} {title}
          </Typography>
          <Typography variant="h5" sx={{  }}>
            START working on your {title} tasks.
          </Typography>
        </Box>
        <Box aria-labelledby={`Your progress in task area ${title}`}>
         {/*  <ProgressCircle title={title} /> */}
        </Box>
      </Box>

      <Box display="flex" justifyContent="space-between">
        
        <Link
          to={
             ( title === "MongoDB" ) && link
          }
        >
          <Button
              disabled={
              title === "PostgreSQL" ||
              /*  title === "MongoDB" || */ 
              title === "Cassandra" ||
               title === "Lab Assignment 1"  ||
              title === "Lab Assignment 2"    ||
              title === "Neo4J"   
            } 
            sx={{
              
            }}
            variant="contained"
            area-aria-label="Start Tasks"
          >
            Start
            <PlayCircleFilledWhiteIcon></PlayCircleFilledWhiteIcon>
          </Button>
        </Link>
        
      </Box>
    </Box>
  );
};

export default StatBox;
