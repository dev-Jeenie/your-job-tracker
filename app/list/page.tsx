"use client";

import { Box, Container, Flex, Group, Stack, Text, TextInput, Title, UnstyledButton } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import "@mantine/dates/styles.css";
import { IconCalendar, IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { ListCard } from "../_components/ListCard";
import { useDeleteJobLink } from "../network/endpoints/jobOpeningListDelete";
import { useGetJobsList } from "../network/endpoints/jobOpeningListGet";
import { useAddJobPosting } from "../network/endpoints/jobOpeningListPost";
import { useGetMetadata } from "../network/endpoints/metadataGet";
import type { MetaData } from "../network/endpoints/metadataGet";


export interface JobPosting {
  id: string;
  url: string;
  deadline?: Date;
  metadata?: MetaData;
}

const LinkInput = ({ addItem }: { addItem: ({ deadline, urlValue }: { deadline?: JobPosting["deadline"], urlValue: JobPosting["url"] }) => void }) => {
  const [urlValue, setUrlValue] = useState<JobPosting["url"]>("")
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

const ListPage = () => {
  const { data: list, refetch } = useGetJobsList();
  const { mutateAsync: postJobPosting } = useAddJobPosting({
    onSuccess: (() => { refetch() }),
    onError: (err) => console.log("postJobPosting onError", err)

  });
  const { mutateAsync: getMetadata } = useGetMetadata({
    onSuccess: (res) => console.log("getMetadata onSuccess", res),
    onError: (err) => console.log("getMetadata onError", err)
  });
  const { mutateAsync: deleteLink } = useDeleteJobLink({
    onSuccess: (() => { refetch() })
  });

  // const form = useForm<{ list: JobPosting[] }>({
  //   mode: "uncontrolled", initialValues: {
  //     list: []
  //   },
  // })

  const addLinkItem = async ({ deadline, urlValue }: { deadline?: JobPosting["deadline"], urlValue: JobPosting["url"] }) => {
    const metadata = await getMetadata({ url: urlValue })
    postJobPosting({
      id: crypto.randomUUID(),
      url: urlValue,
      deadline,
      metadata
    })
  };

  const deleteLinkItem = (targetId: string, url: string) => {
    if (confirm(`Delete ${url}?`)) {
      deleteLink(targetId)
    }
  };

  const editLinkItem = (targetId: string) => {
    console.log("editLinkItem", targetId)
  };

  // useEffect(() => {
  //   form.setValues({ list })
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [list])

  return (
    <Container>
      <Stack mt="xl" gap="md">
        <Title>Add your Job Opening Link</Title>
        <Stack>
          <Box>
            <Text
              size="xl"
              fw={500}
              variant={list && list?.length > 0 ? "gradient" : "text"}
            >
              Job Openings ({list?.length ?? "0"})
            </Text>
            <Text inline c="gray" size="sm">
              Click plus button to add list
            </Text>
          </Box>
          <LinkInput addItem={addLinkItem} />
        </Stack>
        <Stack gap="md" pt="md">
          {list?.map(({ id, deadline, metadata, url }) => {
            return (
              <ListCard
                key={id}
                id={id}
                metadata={metadata}
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
export default ListPage