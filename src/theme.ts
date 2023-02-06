import createTheme from "@mui/material/styles/createTheme";
const customTheme = createTheme({
	typography: {
		h1: {
			fontWeight: 400,
		},
		h2: {
			fontWeight: 400,
		},
		h3: {
			fontWeight: 500,
		},
		h4: {
			fontWeight: 500,
		},
		h5: {
			fontWeight: 500,
		},
		h6: {
			fontWeight: 600,
		},
		body1: {
			fontWeight: 600,
		},
		body2: {
			fontWeight: 600,
		},
		subtitle1: {
			fontWeight: 600,
		},
		subtitle2: {
			fontWeight: 800,
		},
		button: {
			fontWeight: 800,
		},
		caption: {
			fontWeight: 600,
		},
		overline: {
			fontWeight: 600,
		},
		fontFamily: [
			"quicksand",
			"-apple-system",
			"BlinkMacSystemFont",
			'"Segoe UI"',
			'"Helvetica Neue"',
			"Arial",
			"sans-serif",
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(","),
	},
});

export default customTheme;
