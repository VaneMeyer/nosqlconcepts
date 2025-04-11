import { Box, Checkbox, FormControlLabel, FormGroup } from "@mui/material";

export default function CheckBox() {
  return (
    <Box m={3}>
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            name="is-finished-checkbox"
            /*   checked={formData.isFinished}
                              onChange={handleChange} */
          />
        }
        label="Check if you finished this exercise to see your progress on the dashboard assignment card"
      />
    </FormGroup></Box>
  );
}
