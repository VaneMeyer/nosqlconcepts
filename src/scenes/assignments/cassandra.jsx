import { Box } from "@mui/material";
import Header from "../../components/Header";
import OptTaskForm from "../../components/optTaskForm";

const Cassandra = () => {
  return (
    <Box m="20px">
      <Header title="Cassandra" subtitle="Assignment No. 2" />
      <Box height="75vh">
        <OptTaskForm title="Cassandra" />
      </Box>
    </Box>
  );
};

export default Cassandra;
