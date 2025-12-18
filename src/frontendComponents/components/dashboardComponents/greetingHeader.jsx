
import { Toolbar, Typography, Box } from '@mui/material';
import SurveyLink from '../surveyComponents/surveyLink'
import WavingHandIcon from '@mui/icons-material/WavingHand';


const GreetingHeader = ({ username }) => {
  const currentHour = new Date().getHours();
  let greeting;

  if (currentHour < 12) {
    greeting = 'Good morning';
  } else if (currentHour < 18) {
    greeting = 'Hello';
  } else {
    greeting = 'Good evening';
  }

  return (
  
   <Toolbar sx={{ display: "flex", alignItems: "center" }}>
  {/* Linker Bereich */}
  <Box sx={{ flex: 1 }}>
    <Typography variant="h6" sx={{ fontFamily: "'Nunito', sans-serif" }}>
      {`${greeting}, ${username}!`} <WavingHandIcon />
    </Typography>
  </Box>

  {/* Leerer flex-Block in der Mitte, damit das Layout stabil bleibt */}
  <Box sx={{ flex: 1 }} />

  {/* Rechter Bereich */}
  <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
    <SurveyLink />
  </Box>
</Toolbar>

    
  );
};

export default GreetingHeader;