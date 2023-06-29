import React from "preact";
import Wheel from "./Body/Wheel";
import { useState } from "preact/hooks";
import Controls from "./Body/Controls";

export default function Body() {
  const [wheelOptions, setWheelOptions] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);

  const Spin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
  };

  const OnFinish = () => {
    setIsSpinning(false);
  };

  return (
    <div>
      <Wheel
        OnFinish={OnFinish}
        wheelOptions={wheelOptions}
        Spin={Spin}
        isSpinning={isSpinning}
      />
      <Controls
        wheelOptions={wheelOptions}
        setWheelOptions={setWheelOptions}
        isSpinning={isSpinning}
      />
    </div>
  );
}
