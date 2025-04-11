import React from "react";
import { Typography, Box, Container } from "@mui/material";
function Conditions() {
  return (
    <Container>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h3">Terms and Conditions</Typography>
        <Typography variant="body1" paragraph>
          By using this application, you agree to the following terms regarding
          the use of cookies and the collection of your data: <br></br>
          <br></br>
          <b>Cookies:</b> This application uses cookies to store your login
          information. Cookies are small text files stored on your device that
          help us remember your login details for future sessions and provide a
          better user experience.
          <br></br>
          <br></br>
          <b>Data Collection:</b> We collect and use the data you provide,
          including but not limited to answers to exercises, for the following
          purposes: To create and analyze statistics related to user performance
          and engagement. To perform Learning Analytics to improve the
          educational content and overall user experience. To ensure the
          effective functioning of the application and provide personalized
          content.
          <br></br>
          <br></br>
          <b>Data Protection:</b> We are committed to protecting your personal
          data. The information collected will be used in accordance with our
          privacy policy and only for the purposes stated above.
          <br></br>
          <br></br>
          <b>Consent:</b> By continuing to use this application, you consent to
          the storage of cookies on your device and the collection and use of
          your data as described. 
          <br></br>
          <br></br>
          Once you have completed the course, all your data will be permanently deleted from our systems.
          <br></br>
          <br></br>
          If you have any questions or concerns
          regarding our use of cookies and data, please contact us. Thank you
          for your understanding and cooperation.
        </Typography>
      </Box>
    </Container>
  );
}

export default Conditions;
