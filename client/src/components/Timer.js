import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
export default function Timer({ counter }) {
  return (
    <div>
      <CountdownCircleTimer
        isPlaying
        duration={counter}
        colors={[
          ["#004777", 0.33],
          ["#F7B801", 0.33],
          ["#A30000", 0.33],
        ]}
      >
        {({ remainingTime }) => remainingTime}
      </CountdownCircleTimer>
    </div>
  );
}
