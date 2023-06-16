import { Box } from "@mui/material";
import Header from "../../components/Header";
import TaskForm from "../../components/TaskForm";

const MongoDB = () => {
  return (
    <Box m="20px">
      <Header title="MongoDB" subtitle="Assignment No. 4" />
      <Box height="75vh">
        <TaskForm title="MongoDB" taskdescr="" />
      </Box>
    </Box>
  );
};

export default MongoDB;