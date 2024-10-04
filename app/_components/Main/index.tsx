import LandingPage from "@/app/landing/page";
import { Stack } from "@mantine/core";



export const Main = () => {
  return (
    <>
    <Stack h="100vh" justify="center" align="center">
      <Stack gap="md">
        <LandingPage />
      </Stack>
    </Stack>
    </>
  );
};
