import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import customTheme from "./theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ThemeProvider theme={customTheme}>
			<App />
		</ThemeProvider>
	</React.StrictMode>
);
