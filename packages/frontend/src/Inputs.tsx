import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import { WheelInput } from "./App";
import InputOption from "./InputOption";

type Props = {
	inputs: WheelInput[];
	setInputs: (inputs: WheelInput[]) => void;
	isSpinning: boolean;
	setIsSpinning: (isSpinning: boolean) => void;
};

export default function Inputs(props: Props) {
	return (
		<Card sx={{ width: "100%", p: 2, mb: 20, overflow: "auto" }}>
			<Grid2 container direction="column" gap={2}>
				{props.inputs.map((input) => (
					<InputOption
						disabled={props.isSpinning}
						key={input.id}
						index={props.inputs.indexOf(input) + 1}
						id={input.id}
						text={input.text}
						setText={(text, id) => {
							props.setInputs(
								props.inputs.map((input) => {
									if (input.id === id) {
										return { ...input, text };
									}
									return input;
								})
							);
						}}
						deleteInput={(id) => {
							props.setInputs(props.inputs.filter((input) => input.id !== id));
						}}
					/>
				))}

				<Button
					disabled={props.isSpinning}
					onClick={() => {
						props.setInputs([
							...props.inputs,
							{
								id: Math.random().toString(),
								text: "",
							},
						]);
					}}
					variant="contained"
					size="large"
					fullWidth>
					Add Option
				</Button>
			</Grid2>
		</Card>
	);
}
