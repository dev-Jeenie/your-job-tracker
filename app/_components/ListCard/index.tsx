import { Anchor, Box, Card, Flex, Group, Image, Stack, Text, UnstyledButton } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { JobPosting } from "../../list/page";
import styles from "./list.module.css";
import { dateFormatter } from "@/app/utils/dateFormatter";

type ListCardProp = {
    // editLinkItem: (id: string) => void
    deleteLinkItem: (id: string, url: string) => void
} & JobPosting

export const ListCard = (
    {
        id,
        metadata,
        url,
        deadline,
        // editLinkItem,
        deleteLinkItem
    }: ListCardProp) => {
    const parsedUrl = new URL(url);
    const imageSrc = metadata?.og?.image && metadata?.og?.image[0] === "/" ? `${parsedUrl.origin}/${metadata?.og?.image}` : metadata?.og?.image;

    // TODO : meta tag 스크래핑 만으로는 static metatag 페이지 대응 불가. 크롤러 필요

    return (
        <Card shadow="sm" padding="md" radius="md" withBorder className={styles.listcard}>
            <Flex align="center" gap="xs">
                <Text c="blue" fw="bold" size="xl">
                    {deadline && dateFormatter(deadline.toString())}
                </Text>
                <Text fw="bold" size="xl">마감</Text>
            </Flex>
            <Flex className={styles.listCardWrapper} justify="space-between" gap="md">
                <Flex gap="md" justify="space-between" flex={1} align="center">
                    <Stack h="100%" w={200} flex={1} justify="space-between">
                        <Box>
                            <Text fw="bold">{metadata?.title}</Text>
                            <Text style={{
                                   textOverflow: "ellipsis",
                                   overflow: "hidden",
                                   wordBreak: "break-word",
                                   whiteSpace: "nowrap"
                            }}>{metadata?.description}</Text>
                        </Box>
                        <Anchor href={url} target="_blank"
                        style={{
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            wordBreak: "break-word",
                            whiteSpace: "nowrap"
                        }}
                        >{url}</Anchor>
                    </Stack>
                    <Image
                        key="image"
                        maw={180}
                        height={120}
                        fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                        src={imageSrc}
                        alt={url}
                        style={{ borderRadius: "10px" }}
                    />
                </Flex>
                <UnstyledButton onClick={() => deleteLinkItem(id, url)}>
                    <IconTrash color="grey" />
                </UnstyledButton>
            </Flex>
        </Card>
    )
}