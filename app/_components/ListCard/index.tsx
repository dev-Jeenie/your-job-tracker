import { Box, Card, Flex, Image, Stack, Text, UnstyledButton } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { UrlItem } from "../../list/page";
import styles from "./list.module.css";
import { dateFormatter } from "@/app/utils/dateFormatter";

type ListCardProp = {
    editLinkItem: (id: string) => void
    deleteLinkItem: (id: string) => void
} & UrlItem

export const ListCard = (
    {
        id,
        ogdata,
        url,
        deadline,
        editLinkItem,
        deleteLinkItem
    }: ListCardProp) => {
    return (
        <Card shadow="sm" padding="md" radius="md" withBorder>
            <Text c="gray">
                {deadline && dateFormatter(deadline)}
            </Text>
            <Flex className={styles.listCardWrapper} justify="space-between" gap="md">
                <Flex gap="md" justify="space-between" flex={1} align="center">
                    <Stack h="100%" w={200} flex={1} justify="space-between">
                        <Box>
                            <Text fw="bold">{ogdata?.["og:title"]}</Text>
                            <Text>{ogdata?.["og:description"]}</Text>
                        </Box>
                        <Text c="gray" truncate="end">{url}</Text>
                    </Stack>
                    <Image
                        key="image"
                        maw={180}
                        height={120}
                        fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                        src={ogdata?.["og:image"]}
                        alt={url}
                        style={{ borderRadius: "10px" }}
                    />
                </Flex>
                <UnstyledButton onClick={() => editLinkItem(id)}>
                    <IconEdit color="grey" />
                </UnstyledButton>
                <UnstyledButton onClick={() => deleteLinkItem(id)}>
                    <IconTrash color="grey" />
                </UnstyledButton>
            </Flex>
        </Card>
    )
}