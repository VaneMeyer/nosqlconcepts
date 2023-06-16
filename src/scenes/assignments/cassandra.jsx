import { Box } from "@mui/material";
import Header from "../../components/Header";
import TaskForm from "../../components/TaskForm";

const Cassandra = () => {
  return (
    <Box m="20px">
      <Header title="Cassandra" subtitle="Assignment No. 2" />
      <Box height="75vh">
        <TaskForm title="Cassandra" taskdescr="" />
      </Box>
    </Box>
  );
};

export default Cassandra;