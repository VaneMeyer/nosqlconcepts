import React from 'react';
import "./footerStyle.css";
import digitellLogo from "../../images/DigiTeLL_Logo2023.png";
import GULogo from "../../images/GU-Logo-blau.jpg";
import StiftungLogo from "../../images/Logo_Stiftung_Hochschullehre_pos_klein.jpg";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="logo-container">
          <img src={digitellLogo} alt="DigiTeLL Logo 2023" />
        </div>
        <div className="logo-container">
          <img src={GULogo} alt="Goethe University Logo" />
        </div>
        <div className="logo-container">
            <p>funded by</p>
          <img src={StiftungLogo} alt="Logo Stiftung Hochschullehre" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
