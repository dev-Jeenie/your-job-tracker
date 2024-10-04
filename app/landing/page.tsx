"use client";

import { Stack, Text, UnstyledButton } from "@mantine/core";
import "@mantine/dates/styles.css";
import Link from "next/link";
import { LoginButton } from "../_components/LoginButton";


const LandingPage = () => {

  return (
    <Stack h="100vh" justify="center" align="center">
      <Stack gap="md">
      <UnstyledButton size="lg" color="white"
       style={{border:"1px solid gray", borderRadius:"50px", padding:"15px 30px 15px 30px" }}>
        <Link href="/list" style={{textDecoration:"none"}}>
          <Text c="dark">비회원으로 시작하기</Text>
        </Link>
      </UnstyledButton>
      <LoginButton />
      </Stack>
    </Stack>
  )
}
export default LandingPage