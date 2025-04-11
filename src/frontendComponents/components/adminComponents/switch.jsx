import React, { useState, useEffect } from 'react';

import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { fetchStatus, updateNewStatus } from '../../api/adminApi';

export default function SwitchC({areaId}) {
  const [checked, setChecked] = React.useState(false);
  

  useEffect(() => {
    loadStatus();
  }, []);

  const loadStatus = async () => {
    try {
      const response = await fetchStatus(areaId);
      setChecked(response[0].is_active);
     
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const updateStatus = async (isChecked) => {
    try {
     
        await updateNewStatus(areaId, isChecked);
      
      loadStatus();
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
      
    }
    
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
    updateStatus(event.target.checked);
  };


  return (
    <FormControlLabel
      control={
        <Switch
          checked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />
      }
      label="active"
    />
  );
}
