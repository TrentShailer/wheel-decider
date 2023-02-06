import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput, { OutlinedInputProps } from "@mui/material/OutlinedInput";
import React from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

type Props = {
	index: number;
	id: string;
	text: string;
	setText: (text: string, id: string) => void;
	deleteInput: (id: string) => void;
} & OutlinedInputProps;

export default function InputOption(props: Props) {
	return (
		<FormControl sx={{ m: 1 }} variant="outlined">
			<InputLabel>Enter Option {props.index}</InputLabel>
			<OutlinedInput
				disabled={props.disabled}
				value={props.text}
				onChange={(e) => {
					props.setText(e.target.value, props.id);
				}}
				endAdornment={
					<InputAdornment position="end">
						<IconButton
							disabled={props.disabled}
							onClick={() => {
								props.deleteInput(props.id);
							}}
							edge="end">
							<CloseRoundedIcon />
						</IconButton>
					</InputAdornment>
				}
				label={`Enter Option ${props.index}`}
			/>
		</FormControl>
	);
}
