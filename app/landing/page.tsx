"use client";

import { Box, Stack, Text, Title, UnstyledButton } from "@mantine/core";
import "@mantine/dates/styles.css";
import Link from "next/link";
import { LoginButton } from "../_components/LoginButton";
import { Section } from "../_components/Section";
import image1 from "../assets/image/section_1.png"
import image4 from "../assets/image/section_4.png"
import image3 from "../assets/image/section_3.png"



const LandingPage = () => {

  return (
    <Stack gap={0} flex={1} pt="106px" w="100%">
      <Stack h="300px" w="100%" justify="center" align="center" style={{background:"#805cd5"}}>
      {/* #cc94ff */}
        <Title c="white" fw="lighter">취준에만 집중하세요, 잡트래커스</Title>
        {/* 피시 화면 목업 이미지 */}
      </Stack>
      <Section image={image1} text={["취준생은 취준 외에도 할 일이 너무너무 많아요!", "채용공고를 등록하고,","캘린더에 마감일을 하나하나 입력하고,", "진행상황을 메모하고,", "그리고 또...",
      ]} />
      <Section image={image4} text={["자소서, 이력서, 면접 준비도 바쁜데 말이에요.", "불필요한 일에 에너지를 너무 많이 소모해요.", "이제 오로지 취준에만 집중하세요."]} />
      <Section image={image3} text={["잡트래커로 진행상황을 한번에 관리해요."," 링크만 입력하면 마감일을 캘린더로 볼 수 있어요."]} />
      <Stack h="400px" w="100%" justify="center" align="center" style={{background:"#805cd5"}}>
      <Title c="white" fw="lighter">지금 바로 시작해볼까요?</Title>
      <Stack gap="sm">
        <LoginButton color="white" />
        <UnstyledButton size="lg" color="white" style={{textAlign:"center"}}>
          <Link href="/list" style={{textDecoration:"none"}}>
          <Box style={{borderBottom:"1px solid #ffffff6e", display: "inline-block"}}>
            <Text size="sm" c="rgb(255 255 255 / 74%)">비회원으로 시작하기</Text>
          </Box>
          </Link>
        </UnstyledButton>
      </Stack>
      </Stack>
    </Stack>
  )
}
export default LandingPage