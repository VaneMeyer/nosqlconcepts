import { Box } from "@mui/material";
import Header from "../../components/Header";
import OptTaskForm from "../../components/optTaskForm";
import ImportantMsg from "../../components/importantMsg";
import { neo4jTasksOnSite, pgTasksOnSite } from "../../data/tasks";
import pgdataModel from "../../images/datamodel1-transp.png";
import neoDataModel from "../../images/datamodel3-transp.png";

export const Lab1C = () => {
  return (
    <Box m="20px">
      <Header title="Lab Assignment 1" subtitle="PostgreSQL" />
      <ImportantMsg message="" type="info" />
      <ImportantMsg
        message="Note: Please make sure to have a backup of your solutions! You can download your solutions in the Download section."
        type="info"
      />

      <hr></hr>
      <Box height="75vh">
        <OptTaskForm
          title="Lab Assignment 1"
          taskarray={pgTasksOnSite}
          taskarea={5}
          datamodel={pgdataModel}
          endpoint="/getPostgreSQLStructure"
        />
      </Box>
    </Box>
  );
};
export const Lab2C = () => {
  return (
    <Box m="20px">
      <Header title="Lab Assignment 2" subtitle="Neo4J" />
      <ImportantMsg message="" type="info" />
      <ImportantMsg
        message="Note: Please make sure to have a backup of your solutions! You can download your solutions in the Download section."
        type="info"
      />

      <hr></hr>
      <Box height="75vh">
        <OptTaskForm
          title="Lab Assignment 2"
          taskarray={neo4jTasksOnSite}
          taskarea={6}
          datamodel={neoDataModel}
          endpoint="/getNeo4JStructure"
        />
      </Box>
    </Box>
  );
};
