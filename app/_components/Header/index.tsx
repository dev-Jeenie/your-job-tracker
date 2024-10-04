"use client"

import { Container, Flex, Group, Portal, rem, Text, Title, UnstyledButton } from "@mantine/core";
import { useHeadroom } from "@mantine/hooks";
import { IconMenu } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Logo from "../../assets/icon/thumbnail.png";
import { LoginButton } from "../LoginButton";

    const links = [
        { to: "PATHS.home", text: 'HOME', background: 'default' },
      ] as {
        to: string
        text: string
        background: string
      }[]

export const Header = () => {
    const { data: session } = useSession();
    const [isSideGnbOpen, setIsSideGnbOpen] = useState<boolean>(false)
    const pinned = useHeadroom({ fixedAt: 120 });

return (
    <>
    <Portal>
    <header 
    style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        transform: `translate3d(0, ${pinned ? 0 : rem(-110)}, 0)`,
        transition: 'transform 400ms ease',
        backgroundColor: "rgba(255, 255, 255)",
    }}
    >
    <Container>
        <Flex
          align="center"
          justify="space-between"
          flex={1}
        >
            <Link
            href="/">
              <Image src={Logo} width={100} alt="" />
            </Link>
            <Flex gap="sm">
                {session ?
                    <Group gap="xs">
                        <Image src={session?.user?.image || ""} width={50} style={{borderRadius:"50%"}} alt="profile image" />
                        <Text>{session?.user?.name}님, 환영해요.</Text>
                    </Group>
                    :
                    <LoginButton color="gray" />
                }
                <UnstyledButton
                    size="m"
                    variant="text"
                    onClick={() => {
                      setIsSideGnbOpen(true)
                    }}
                >
                    <IconMenu color="gray" width={36} />
                </UnstyledButton>
            </Flex>
        </Flex>
      </Container>
    </header>
    </Portal>
  </>
)
}