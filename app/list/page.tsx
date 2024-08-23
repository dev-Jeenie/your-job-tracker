"use client";

import { Box, Container, Flex, Group, Image, Stack, Text, TextInput, Title, UnstyledButton } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useState } from "react";

type OgMetaData = {
  'og:title'?: string;
  'og:type'?: string;
  'og:url'?: string;
  'og:image'?: string;
  'og:site_name'?: string;
  'og:description'?: string;
  'article:published_time'?: string
}

interface UrlItem {
  id: string;
  url: string;
  ogdata?: OgMetaData;
}


const LinkInput = ({ addItem }: { addItem: (urlValue: UrlItem["url"]) => void }) => {
  const [urlValue, setUrlValue] = useState<UrlItem["url"]>("")

  return (
    <Flex align="center" justify="space-between" gap="md">
      <TextInput
        flex={1}
        size="lg"
        placeholder="add your JO link"
        onChange={(v) =>
          setUrlValue(v.target.value)
        }
        value={urlValue}
      />
      <UnstyledButton onClick={() => addItem(urlValue)}>
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

  const addLinkItem = (url: string) => {
    if (url) {
      const newId = crypto.randomUUID();
      const newData = {
        url,
        id: newId,
        ogdata: {
          "og:title": "Crawled Data Title",
          "og:description": "Apply Now!",
          "og:image": "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
          "article:published_time": `${new Date().getFullYear().toString().slice(2, 4)}.` + `${new Date().getMonth()}.` + `${new Date().getDay()}`
        }
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

  return (
    <Container>
      <Stack mt="xl" gap="md">
        <Title>Add your Job Opening Link</Title>
        <Stack>
          <Box>
            <Text
              variant={results?.length > 0 ? "gradient" : "text"}
              style={{ fontWeight: "500" }}
            >
              Job Openings ({results?.length})
            </Text>
            <Text inline style={{ color: "gray" }} size="sm">
              Click plus button to add list
            </Text>
          </Box>
          <LinkInput addItem={addLinkItem} />
        </Stack>
        <Stack gap="md" pt="md">
          {results?.map(({ id, ogdata, url }) => (
            <Flex key={id} align="center" justify="space-between" gap="md">
              <Flex gap="md" justify="space-between" flex={1}>
                <Text>
                  {ogdata?.["article:published_time"]}
                </Text>
                <Box flex={1}>
                  <Text fw="bold">{ogdata?.["og:title"]}</Text>
                  <Text c="gray">{ogdata?.["og:description"]}</Text>
                  <Text>{url}</Text>
                </Box>
                <Image
                  fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                  src={ogdata?.["og:site_name"]}
                  height={100}
                  alt={url}
                />
              </Flex>
              <UnstyledButton onClick={() => deleteLinkItem(id)}>
                <IconTrash color="grey" />
              </UnstyledButton>
            </Flex>
          ))}
        </Stack>
      </Stack>
    </Container>
  )
  // );
}
