import { Box } from "@mui/material";
import Header from "../../components/Header";
import OptTaskForm from "../../components/optTaskForm";
import ImportantMsg from "../../components/importantMsg";
import neoDataModel from "../../images/datamodel3-transp.png";
import { neo4jTasks } from "../../data/tasks";

const Neo4J = () => {
  return (
    <Box m="20px">
      <Header title="Neo4J" subtitle="Assignment No. 3" />
      <ImportantMsg
        message=" Please do not work longer than the specified time on a task! If you
        think that you will not be able to finish the task in the given maximum
        time, stop working on it 15 minutes before the end, and provide an
        explanation containing the following information: Whether you think that
        the task is solvable with the current system at all, and why? If you
        think that is solvable with more time: which approach, would you try out
        next?"
        type="info"
      />
      <ImportantMsg
        message="Note: Please make sure to have a backup of your solutions! You can download your solutions in the Download section."
        type="info"
      />

      <hr></hr>
      <Box height="75vh">
        <OptTaskForm title="Neo4J" taskarray={neo4jTasks}
          taskarea={3}
          datamodel={neoDataModel}
          endpoint="/getNeo4JStructure" />
      </Box>
    </Box>
  );
};

export default Neo4J;
