import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const ColorLinearProgress = withStyles({
  root: {
    width: "100%",
    margin: "auto",
  },
  colorPrimary: {
    backgroundColor: "#b2dfdb",
  },
  barColorPrimary: {
    backgroundColor: "#00695c",
  },
})(LinearProgress);

export default function LinearDeterminate({
  counter,
  prevCounter,
  progress,
  setProgress,
}) {
  const classes = withStyles();
  useEffect(() => {
    setProgress((prev) => prev - 100 / (prevCounter * 2));
  }, [counter, prevCounter]);

  return (
    <div className={classes.root}>
      <ColorLinearProgress
        variant="determinate"
        value={progress}
        style={{ height: "2vh", borderRadius: "5px" }}
      />
    </div>
  );
}
