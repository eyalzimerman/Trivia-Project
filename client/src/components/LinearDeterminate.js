import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles({
  root: {
    width: "45%",
    margin: "auto",
  },
});

export default function LinearDeterminate({
  counter,
  prevCounter,
  progress,
  setProgress,
}) {
  const classes = useStyles();
  useEffect(() => {
    setProgress((prev) => prev - 100 / (prevCounter * 2));
  }, [counter, prevCounter]);

  return (
    <div className={classes.root}>
      <LinearProgress
        variant="determinate"
        value={progress}
        style={{ height: "2vh", borderRadius: "5px" }}
      />
    </div>
  );
}
