import { Box, Card, Flex, Image, Stack, Text, UnstyledButton } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { JobPosting } from "../../list/page";
import styles from "./list.module.css";
import { dateFormatter } from "@/app/utils/dateFormatter";

type ListCardProp = {
    editLinkItem: (id: string) => void
    deleteLinkItem: (id: string, url: string) => void
} & JobPosting

export const ListCard = (
    {
        id,
        metadata,
        url,
        deadline,
        editLinkItem,
        deleteLinkItem
    }: ListCardProp) => {
    const parsedUrl = new URL(url);
    const imageSrc = metadata?.og?.image && metadata?.og?.image[0] === "/" ? `${parsedUrl.origin}/${metadata?.og?.image}` : metadata?.og?.image;
    
    // TODO : meta tag 스크래핑 만으로는 static metatag 페이지 대응 불가. 결국은 크롤러가 필요하다

    return (
        <Card shadow="sm" padding="md" radius="md" withBorder>
            <Text c="gray">
                {deadline && dateFormatter(deadline.toString())}
            </Text>
            <Flex className={styles.listCardWrapper} justify="space-between" gap="md">
                <Flex gap="md" justify="space-between" flex={1} align="center">
                    <Stack h="100%" w={200} flex={1} justify="space-between">
                        <Box>
                            <Text fw="bold">{metadata?.title}</Text>
                            <Text>{metadata?.description}</Text>
                        </Box>
                        <Text c="gray" truncate="end">{url}</Text>
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
                <UnstyledButton onClick={() => editLinkItem(id)}>
                    <IconEdit color="grey" />
                </UnstyledButton>
                <UnstyledButton onClick={() => deleteLinkItem(id, url)}>
                    <IconTrash color="grey" />
                </UnstyledButton>
            </Flex>
        </Card>
    )
}