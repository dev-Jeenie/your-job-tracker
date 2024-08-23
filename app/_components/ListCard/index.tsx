import styles from "./list.module.css";
import { Box, Card, Flex, Image, Stack, Text, UnstyledButton } from "@mantine/core"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import { UrlItem } from "../../list/page"

type ListCardProp = {
    editLinkItem: (id: string) => void
    deleteLinkItem: (id: string) => void
} & UrlItem

export const ListCard = (
    {
        id,
        ogdata,
        url,
        editLinkItem,
        deleteLinkItem
    }: ListCardProp) => {
    return (
        <Card shadow="sm" padding="md" radius="md" withBorder>
            <Flex className={styles.listCardWrapper} justify="space-between" gap="md">
                <Flex gap="md" justify="space-between" flex={1} align="center">
                    <Text>
                        {ogdata?.["article:published_time"]}
                    </Text>
                    <Stack h="100%" w={200} flex={1} justify="space-between">
                        <Box>
                            <Text fw="bold">{ogdata?.["og:title"]}</Text>
                            <Text>{ogdata?.["og:description"]}</Text>
                        </Box>
                        <Text c="gray" truncate="end">{url}</Text>
                    </Stack>
                    <Image
                        h={120}
                        radius="md"
                        fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                        src={ogdata?.["og:site_name"]}
                        alt={url}
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