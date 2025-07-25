import { Button } from '@mui/material';
import { styled } from '@mui/system';

 const GradientButton = styled(Button)(({ theme }) => ({
    borderRadius: '25px',
    padding: '10px 20px',
    background: 'linear-gradient(135deg,rgb(197, 225, 250) 0%,rgb(135, 206, 210) 100%)',
    color: 'rgb(0,0,0)',
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '1rem',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 14px rgba(0, 0, 0, 0.15)',
      background: 'linear-gradient(135deg, #3fa9f5 0%, #00d6e6 100%)',
    },
  
    '&:focus-visible': {
      outline: '3px solid #ffffff',
      outlineOffset: '2px',
    },
  
    '&:disabled': {
      background: '#b3e5fc',
      color: '#ffffff',
      opacity: 0.6,
    },
  }));

export default GradientButton;