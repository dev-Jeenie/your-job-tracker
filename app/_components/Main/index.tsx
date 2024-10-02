"use client"

// import styles from "./main.module.css";

import { Group, Stack, Text, UnstyledButton } from "@mantine/core";
import Image from "next/image";
import GoogleSVG from '../../assets/icon/google-fill.svg';
import Link from "next/link";
import { useSession } from "next-auth/react";
import ListPage from "@/app/list/page";
import { signIn } from "next-auth/react"
import { useEffect } from "react";
import { redirect } from "next/navigation";



export const Main = () => {
  const { data: session } = useSession();


  return (
    <>
    <Stack h="100vh" justify="center" align="center">
      <Stack gap="md">

      <UnstyledButton size="lg" color="white"
       style={{border:"1px solid gray", borderRadius:"50px", padding:"15px 30px 15px 30px" }}
        onClick={() => signIn("google")}>
          <Group gap="sm">
            <Image src={GoogleSVG} width={24} alt="google login" />
            <Text c="dark">구글로 시작하기</Text>
          </Group>
      </UnstyledButton>
      </Stack>
    </Stack>
    </>
  );
};
