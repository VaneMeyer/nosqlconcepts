import { Box } from "@mui/material"
import Header from "../../components/Header"
import TaskForm from "../../components/TaskForm"

const PostgreSQL = () => {
  return (
    <Box m="20px">
      <Header title="PostgreSQL" subtitle="Assignment No. 1" />
      <Box height="75vh">
        <TaskForm
          title="PostgreSQL"
          taskdescr="For each person you want to know in which department she or he works. Therefore, you should make an output that contains a person’s first name and last name and the name of the department she or he is working at."
        />
      </Box>
    </Box>
  )
}

export default PostgreSQL
