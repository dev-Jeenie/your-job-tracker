"use client";

import { Box, Container, Flex, Group, Stack, Text, TextInput, Title, UnstyledButton } from "@mantine/core";
import { DatesProvider, DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconCalendar, IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { ListCard } from "../_components/ListCard";
import "@mantine/dates/styles.css";


type OgMetaData = {
  'og:title'?: string;
  'og:type'?: string;
  'og:url'?: string;
  'og:image'?: string;
  'og:site_name'?: string;
  'og:description'?: string;
  'article:published_time'?: string
}

export interface UrlItem {
  id: string;
  url: string;
  deadline?: Date;
  ogdata?: OgMetaData;
}

const LinkInput = ({ addItem }: { addItem: ({ deadline, urlValue }: { deadline?: UrlItem["deadline"], urlValue: UrlItem["url"] }) => void }) => {
  const [urlValue, setUrlValue] = useState<UrlItem["url"]>("")
  const [deadline, setDeadline] = useState<Date>()

  return (
    <Flex align="center" justify="space-between" gap="md">
      <Group w="100%" gap="sm">
        <TextInput
          maw={410}
          w="100%"
          size="md"
          label="Url"
          placeholder="add your JO link"
          onChange={(v) =>
            setUrlValue(v.target.value)
          }
          value={urlValue}
        />
        <DateTimePicker
          size="md"
          flex={1}
          clearable
          highlightToday
          rightSection={<IconCalendar />}
          label="Deadline"
          value={deadline}
          onChange={(v) => setDeadline(v as Date)}
        />
      </Group>
      <UnstyledButton onClick={() => addItem({ urlValue, deadline })}>
        <IconPlus color="grey" />
      </UnstyledButton>
    </Flex>
  );
};
export default function ListPage() {

  const form = useForm<{ list: UrlItem[] }>({
    mode: "uncontrolled", initialValues: {
      list: []
    },
    onValuesChange: (values) => console.log("values", values)
  })

  const results = form.getValues().list || [];

  const addLinkItem = ({ deadline, urlValue }: { deadline?: UrlItem["deadline"], urlValue: UrlItem["url"] }) => {
    if (urlValue) {
      const newId = crypto.randomUUID();
      const newData = {
        id: newId,
        url: urlValue,
        deadline,
        ogdata: {
          "og:title": "Crawled Data Title",
          "og:description": "Apply Now!",
          "og:image": "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
        },
      }

      form.setValues((prev) => ({
        list: [...prev.list || [], newData]
      }))
    }
  };

  const deleteLinkItem = (targetId: string) => {
    form.setValues((prev) => ({
      list: prev.list?.filter((url) => url.id !== targetId)
    }))
  };

  const editLinkItem = (targetId: string) => {
    console.log("editLinkItem", targetId)
  };

  return (
    <Container>
      <Stack mt="xl" gap="md">
        <Title>Add your Job Opening Link</Title>
        <Stack>
          <Box>
            <Text
              size="xl"
              fw={500}
              variant={results?.length > 0 ? "gradient" : "text"}
            >
              Job Openings ({results?.length})
            </Text>
            <Text inline c="gray" size="sm">
              Click plus button to add list
            </Text>
          </Box>
          <LinkInput addItem={addLinkItem} />
        </Stack>
        <Stack gap="md" pt="md">
          {results?.map(({ id, deadline, ogdata, url }) => {
            return (
              <ListCard
                key={id}
                id={id}
                ogdata={ogdata}
                url={url}
                deadline={deadline}
                editLinkItem={editLinkItem}
                deleteLinkItem={deleteLinkItem}
              />
            )
          })}
        </Stack>
      </Stack>
    </Container>
  )
  // );
}
