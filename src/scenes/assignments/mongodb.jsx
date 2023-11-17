import { Box } from "@mui/material";
import Header from "../../components/Header";
import OptTaskForm from "../../components/optTaskForm";

const MongoDB = () => {
  return (
    <Box m="20px">
      <Header title="MongoDB" subtitle="Assignment No. 4" />
      <Box height="75vh">
        <OptTaskForm title="MongoDB" />
      </Box>
    </Box>
  );
};

export default MongoDB;
