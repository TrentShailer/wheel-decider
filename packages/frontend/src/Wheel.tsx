import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import React from "react";
import { WheelInput } from "./App";
import * as colors from "@mui/material/colors";

type Props = {
	inputs: WheelInput[];
	isSpinning: boolean;
	setIsSpinning: (isSpinning: boolean) => void;
};

const colorOptions = [
	"red",
	"deepOrange",
	"orange",
	"amber",
	"yellow",
	"lime",
	"lightGreen",
	"green",
	"teal",
	"cyan",
	"lightBlue",
	"blue",
	"indigo",
	"deepPurple",
	"purple",
	"pink",
] as Array<keyof typeof colors>;

export default function Wheel(props: Props) {
	const [wheelSVG, setWheelSVG] = React.useState<JSX.Element | null>(null);
	const [startingColor, setStartingColor] = React.useState(0);
	const theme = useTheme();
	const [wheelSize, setWheelSize] = React.useState(800);
	const [wheelRotation, setWheelRotation] = React.useState(0);

	React.useEffect(() => {
		const handleResize = () => {
			const size = Math.max(Math.min(window.innerWidth, window.innerHeight) * 0.5, 350);
			setWheelSize(size);
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	React.useEffect(() => {
		setStartingColor(Math.floor(Math.random() * colorOptions.length));
	}, []);

	React.useEffect(() => {
		const numberOfSegments = props.inputs.length;
		const segmentAngle = 360 / numberOfSegments;
		const radius = wheelSize / 2;

		const segments = props.inputs.map((input, index) => {
			const startAngle = index * segmentAngle;
			const endAngle = startAngle + segmentAngle;
			const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

			const d = `M 0 0 L ${radius * Math.cos((Math.PI * startAngle) / 180)} ${
				radius * Math.sin((Math.PI * startAngle) / 180)
			} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${
				radius * Math.cos((Math.PI * endAngle) / 180)
			} ${radius * Math.sin((Math.PI * endAngle) / 180)} Z`;

			const colorOffset = Math.floor(index / 10);
			const shadeIndex = index % 10 === 0 ? 50 : (index % 10) * 100;
			const colorIndex = (startingColor + colorOffset) % colorOptions.length;
			const color = colors[colorOptions[colorIndex]];
			const shade = color[shadeIndex as keyof typeof color];

			let textAngle = startAngle + segmentAngle / 2;

			const textX = (radius / 2) * Math.cos((Math.PI * textAngle) / 180);
			const textY = (radius / 2) * Math.sin((Math.PI * textAngle) / 180);
			if (textAngle > 90 && textAngle < 270) {
				textAngle += 180;
			}

			const fontSize = Math.max(Math.min(radius / 15, 20), 12);
			const text = (
				<g transform={`translate(${textX} ${textY}) rotate(${textAngle + 180})`}>
					<text
						textAnchor="middle"
						dominantBaseline="central"
						fontSize={fontSize}
						fontWeight="700"
						fontFamily="Quicksand, sans-serif"
						fill={theme.palette.getContrastText(shade)}>
						{input.text}
					</text>
				</g>
			);

			return (
				<g key={input.id}>
					<path d={d} fill={shade} />
					{text}
				</g>
			);
		});

		const wheel = <g>{segments}</g>;

		setWheelSVG(wheel);
	}, [props.inputs, startingColor, wheelSize]);

	const Spin = () => {
		if (props.isSpinning) {
			return;
		}
		props.setIsSpinning(true);

		setTimeout(() => {
			props.setIsSpinning(false);
		}, 8500);

		// pick a random end angle
		const randomAngle = Math.floor(Math.random() * 360) + 0.5;
		// add current rotation to end angle
		const endAngle = wheelRotation + randomAngle + 360 * 4;

		const normalizedEndAngle = endAngle % 360;
		const numberOfSegments = props.inputs.length;
		const segmentAngle = 360 / numberOfSegments;
		let segmentIndex = Math.floor(normalizedEndAngle / segmentAngle);
		const segment = props.inputs[numberOfSegments - (segmentIndex + 1)];
		console.log(segment);

		// set rotation to end angle
		setWheelRotation(endAngle);
	};

	return (
		<Box onClick={Spin} sx={{ cursor: props.isSpinning ? "default" : "pointer" }}>
			<svg
				width={wheelSize}
				height={wheelSize}
				viewBox={`-${wheelSize / 2} -${wheelSize / 2} ${wheelSize + 10} ${wheelSize + 10}`}
				xmlns="http://www.w3.org/2000/svg">
				<Box
					component={"g"}
					sx={{
						transform: `rotate(${wheelRotation}deg)`,
						transition: "transform 8s cubic-bezier(0.07, 0.9, 0.42, 0.95)",
					}}>
					{wheelSVG}
				</Box>
				<g transform="translate(10, 0)">
					{/* arrow on right of wheel */}
					<path
						d={`M ${wheelSize / 2 - 50} 0 L ${wheelSize / 2} 10 L ${
							wheelSize / 2
						} -10 Z`}
						fill={"rgba(0, 0, 0, 0.75)"}
					/>
				</g>
			</svg>
		</Box>
	);
}
