import { Box, Flex } from "@chakra-ui/react";
import React from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import WheelSVG from "./Wheel/WheelSVG";

type Props = {
  wheelOptions: string;
  isSpinning: boolean;
  Spin: Function;
  OnFinish: Function;
};

const colors = [
  "#FEB2B2",
  "#FBD38D",
  "#FAF089",
  "#9AE6B4",
  "#81E6D9",
  "#90cdf4",
  "#9DECF9",
  "#D6BCFA",
  "#FBB6CE",
];

export default function Wheel({
  wheelOptions,
  isSpinning,
  Spin,
  OnFinish,
}: Props) {
  const [rotation, setRotation] = useState(0);

  const onSpin = () => {
    if (isSpinning) return;
    Spin();
    setRotation(rotation + 360 * 5 + Math.floor(Math.random() * 360));
    setTimeout(() => {
      OnFinish();
    }, 8000);
  };

  return (
    <Flex justifyContent="center">
      <svg
        width={"min(100%, 75vh)"}
        height={"min(100%, 75vh)"}
        viewBox={`-52 -52 104 104`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <Box
          onClick={onSpin}
          cursor={isSpinning ? "default" : "pointer"}
          as="g"
          transform={`rotate(${rotation}deg)`}
          transition={"transform 8s cubic-bezier(0.1,-0.2,0,1)"}
        >
          <WheelSVG wheelOptions={""} colors={["#fff"]} />
          <WheelSVG wheelOptions={wheelOptions} colors={colors} />
        </Box>
        {/* arrow on right of wheel */}
        <g>
          <path d={`M 52 -3 L 52 3 L 40 0 Z`} fill={"#ffffffcc"} />
        </g>
      </svg>
    </Flex>
  );
}
