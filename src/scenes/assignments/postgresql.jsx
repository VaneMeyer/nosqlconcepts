import { Box } from "@mui/material";
import Header from "../../components/Header";
import OptTaskForm from "../../components/optTaskForm";

const PostgreSQL = () => {
  return (
    <Box m="20px">
      <Header title="PostgreSQL" subtitle="Assignment No. 1" />
      <Box height="75vh">
        <OptTaskForm title="PostgreSQL" />
      </Box>
    </Box>
  );
};

export default PostgreSQL;
