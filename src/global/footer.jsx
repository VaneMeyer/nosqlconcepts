import React, { useState, useEffect } from "react";
import digitellLogo from "../images/DigiTeLL_Logo2023.png";
import GULogo from "../images/GU-Logo-blau.jpg";
import StiftungLogo from "../images/Logo_Stiftung_Hochschullehre_pos_klein.jpg";
import { Container, Grid, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(4, 0),
  marginTop: theme.spacing(8),
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  "& img": {
    maxWidth: "50%",
    height: "auto",
  },
  "& p": {
    margin: 0,
    marginBottom: theme.spacing(1),
  },
}));

function Footer() {
  return (
    <FooterContainer>
      <Container>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <LogoContainer>
              <img src={digitellLogo} alt="DigiTeLL Logo 2023" />
            </LogoContainer>
          </Grid>
          <Grid item xs={12} sm={4}>
            <LogoContainer>
              <img src={GULogo} alt="Goethe University Logo" />
            </LogoContainer>
          </Grid>
          <Grid item xs={12} sm={4}>
            <LogoContainer>
              <Typography variant="body1">funded by</Typography>
              <img src={StiftungLogo} alt="Logo Stiftung Hochschullehre" />
            </LogoContainer>
          </Grid>
        </Grid>
      </Container>
    </FooterContainer>
  );
}

export default Footer;
