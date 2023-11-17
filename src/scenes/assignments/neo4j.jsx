import { Box } from "@mui/material";
import Header from "../../components/Header";
import OptTaskForm from "../../components/optTaskForm";

const Neo4J = () => {
  return (
    <Box m="20px">
      <Header title="Neo4J" subtitle="Assignment No. 3" />
      <Box height="75vh">
        <OptTaskForm title="Neo4J" />
      </Box>
    </Box>
  );
};

export default Neo4J;
