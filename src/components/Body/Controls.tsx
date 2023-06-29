import { Textarea } from "@chakra-ui/react";
import React from "preact";
import { StateUpdater } from "preact/hooks";

type Props = {
  wheelOptions: string;
  setWheelOptions: StateUpdater<string>;
  isSpinning: boolean;
};

export default function Controls({
  isSpinning,
  wheelOptions,
  setWheelOptions,
}: Props) {
  return (
    <Textarea
      isDisabled={isSpinning}
      value={wheelOptions}
      onChange={(e: any) => setWheelOptions(e.target.value)}
      resize="vertical"
      placeholder="One option per line"
    />
  );
}
