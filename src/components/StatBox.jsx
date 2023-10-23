import { Box, Button, Typography, useTheme } from "@mui/material"
import { tokens } from "../theme"
import ProgressCircle from "./ProgressCircle"
import { Link } from "react-router-dom"

const StatBox = ({
  title,
  subtitle,
  icon,
  progress,
  increase,
  link,
  status1,
  status2,
}) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[500] }}
          >
            {title}
          </Typography>
        </Box>
        {status2 ? (
          <Button
            sx={{
              backgroundColor: "#7CC084",
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              {status2}
            </Typography>
          </Button>
        ) : status1 == "In Progress" ? (
          <Button
            sx={{
              backgroundColor: "#F9EA62",
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              {status1}
            </Typography>
          </Button>
        ) : (
          <Button
            sx={{
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Not Started
            </Typography>
          </Button>
        )}
        <Box>
          <ProgressCircle progress={progress} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
          {subtitle}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: colors.greenAccent[100] }} //600
        >
          {increase}
        </Typography>
      </Box>
      <Box>
        <Link to={link}>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            Start
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

export default StatBox
