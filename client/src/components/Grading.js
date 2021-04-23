import React, { useState } from "react";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

export default function Grading({ onRateClicking }) {
  const [value, setValue] = React.useState(0);
  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Rate Question:</Typography>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </Box>
      <Button variant="contained" color="primary" onClick={onRateClicking}>
        Skip
      </Button>
    </div>
  );
}
