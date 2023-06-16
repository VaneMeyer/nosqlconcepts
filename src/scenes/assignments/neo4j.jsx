import { Box } from "@mui/material";
import Header from "../../components/Header";
import TaskForm from "../../components/TaskForm";

const Neo4J = () => {
  return (
    <Box m="20px">
      <Header title="Neo4J" subtitle="Assignment No. 3" />
      <Box height="75vh">
        <TaskForm title="Neo4J" taskdescr="" />
      </Box>
    </Box>
  );
};

export default Neo4J;