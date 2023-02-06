import { Container, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useState } from "react";
import Inputs from "./Inputs";
import Wheel from "./Wheel";

export type WheelInput = {
	id: string;
	text: string;
};

function App() {
	const [inputs, setInputs] = useState<WheelInput[]>([]);
	const [isSpinning, setIsSpinning] = useState(false);
	return (
		<div className="App">
			<Container>
				<Grid2
					container
					direction="column"
					justifyContent={"center"}
					alignItems="center"
					gap={4}>
					<Typography textAlign={"center"} variant="h2">
						Wheel Decider
					</Typography>
					<Wheel isSpinning={isSpinning} setIsSpinning={setIsSpinning} inputs={inputs} />
					<Inputs
						isSpinning={isSpinning}
						setIsSpinning={setIsSpinning}
						inputs={inputs}
						setInputs={setInputs}
					/>
				</Grid2>
			</Container>
		</div>
	);
}

export default App;
