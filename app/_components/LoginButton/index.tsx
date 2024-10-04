import { Group, Text, UnstyledButton } from "@mantine/core"
import { signIn } from "next-auth/react"
import Image from "next/image"
import GoogleSvg from "../../assets/icon/google-fill.svg"

export const LoginButton = () => {
    return (
        <UnstyledButton size="lg" color="white"
        style={{border:"1px solid gray", borderRadius:"50px", padding:"15px 30px 15px 30px" }}
         onClick={() => signIn("google")}>
           <Group gap="sm">
             <Image src={GoogleSvg} width={24} alt="google login" />
             <Text c="dark">구글로 시작하기</Text>
           </Group>
       </UnstyledButton>
    )
}