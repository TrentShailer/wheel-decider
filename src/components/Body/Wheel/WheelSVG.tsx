import React from "preact";
import { useEffect, useState } from "preact/hooks";

type Props = {
  wheelOptions: string;
  colors: string[];
};

const GenerateSegment = (
  index: number,
  segmentAngle: number,
  radius: number
) => {
  const startAngle = index * segmentAngle;
  const endAngle = startAngle + segmentAngle;
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  const d = `M 0 0 L ${radius * Math.cos((Math.PI * startAngle) / 180)} ${
    radius * Math.sin((Math.PI * startAngle) / 180)
  } A ${radius} ${radius} 0 ${largeArcFlag} 1 ${
    radius * Math.cos((Math.PI * endAngle) / 180)
  } ${radius * Math.sin((Math.PI * endAngle) / 180)} Z`;

  return d;
};

const GenerateText = (
  option: string,
  index: number,
  segmentAngle: number,
  radius: number
) => {
  const truncate = option.length > 25;

  const startAngle = index * segmentAngle;
  let textAngle = startAngle + segmentAngle / 2;

  const textX = (radius / 2) * Math.cos((Math.PI * textAngle) / 180);
  const textY = (radius / 2) * Math.sin((Math.PI * textAngle) / 180);

  // fontsize can't be that x * fontsize * chars > radius

  const fontSize = 3;
  const text = (
    <g transform={`translate(${textX} ${textY}) rotate(${textAngle})`}>
      <text
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={fontSize + "px"}
        fontWeight="700"
        fontFamily="Inter, sans-serif"
        fill="#000000eb"
      >
        {truncate ? option.substring(0, 22) + "..." : option}
      </text>
    </g>
  );

  return text;
};

const GenerateSVG = (
  options: string[],
  colors: string[]
): React.JSX.Element => {
  const numSegments = options.length;
  const segmentAngle = 360 / numSegments;
  const radius = 50;

  const segments = options.map((option, index) => {
    return (
      <g key={index}>
        <path
          d={GenerateSegment(index, segmentAngle, radius)}
          fill={colors[index % colors.length]}
        />
        {GenerateText(option, index, segmentAngle, radius)}
      </g>
    );
  });

  return <g> {segments} </g>;
};

export default function WheelSVG({ wheelOptions, colors }: Props) {
  const [svg, setSVG] = useState<React.JSX.Element | null>(null);

  useEffect(() => {
    const options = wheelOptions.split("\n");
    const newSVG = GenerateSVG(options, colors);
    setSVG(newSVG);
  }, [wheelOptions]);
  return svg;
}
