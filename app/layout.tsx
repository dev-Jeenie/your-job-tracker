import '@mantine/core/styles.css';
import { Container, createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <MantineProvider theme={theme}>
          <Container size="sm">
            {children}
          </Container>
        </MantineProvider>
      </body>
    </html>

  );
}
