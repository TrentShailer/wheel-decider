import { Box, ChakraProvider, Container } from "@chakra-ui/react";
import { render } from "preact";
import { useState } from "preact/hooks";
import theme from "./theme";
import Footer from "./components/Footer";
import Body from "./components/Body";

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <Container maxW="container.lg">
        <Box pt={4} minH="calc(100vh - 60px)">
          <Body />
        </Box>
        <Footer />
      </Container>
    </ChakraProvider>
  );
}

render(<App />, document.getElementById("app"));
