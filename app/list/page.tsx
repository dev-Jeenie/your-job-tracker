"use client";

import { Box, Container, Flex, Group, Stack, Text, TextInput, Title, UnstyledButton } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import "@mantine/dates/styles.css";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconCalendar, IconPlus } from "@tabler/icons-react";
import { ListCard } from "../_components/ListCard";
import { useDeleteJobLink } from "../network/endpoints/jobOpeningListDelete";
import { useGetJobsList } from "../network/endpoints/jobOpeningListGet";
import { useAddJobPosting } from "../network/endpoints/jobOpeningListPost";
import type { MetaData } from "../network/endpoints/metadataGet";
import { useGetMetadata } from "../network/endpoints/metadataGet";
import { urlValidator } from "../utils/urlValidator";


export interface JobPosting {
  id: string;
  url: string;
  deadline: Date;
  metadata?: MetaData;
  // metadata?: MetaData<OgTypeFromServer>;
}

const LinkInput = ({ addItem }: { addItem: ({ deadline, urlValue }: { deadline: JobPosting["deadline"], urlValue: JobPosting["url"] }) => void }) => {

  const form = useForm<{ url: string; deadline: Date | null }>({
    mode: "uncontrolled",
    initialValues: {
      url: "",
      deadline: null
    },
    validate: {
      url: (value) => {
        return value.length > 0 && urlValidator(value) ? null : "Invalid URL"
      },
      deadline: (value) => {
        return value !== null ? null : "Deadline is required"
      }
    }

  })

  const handleSubmit = form.onSubmit((value) => {
    if (value.deadline === null || value.url === null) return;
    addItem({ urlValue: value.url, deadline: value.deadline })
  });

  return (
    <form onSubmit={handleSubmit}>
      <Flex align="center" justify="space-between" gap="md">
        <Group w="100%" gap="sm" h={90} align="flex-start">
          <TextInput
            maw={410}
            w="100%"
            size="md"
            label="Url"
            placeholder="add your Job Posting link"
            key={form.key("url")}
            {...form.getInputProps("url")}
          />
          <DateTimePicker
            size="md"
            flex={1}
            clearable
            highlightToday
            rightSection={<IconCalendar />}
            label="Deadline"
            placeholder="Select deadline"
            key={form.key("deadline")}
            {...form.getInputProps("deadline")}

          />
        </Group>
        <UnstyledButton type="submit">
          <IconPlus color="grey" />
        </UnstyledButton>
      </Flex>
    </form>

  );
};

const ListPage = () => {
  const { data: list, refetch } = useGetJobsList();
  const { mutateAsync: postJobPosting } = useAddJobPosting({
    onSuccess() {
      notifications.show({
        position: 'bottom-center',
        withCloseButton: true,
        color: "green",
        message: "Your Job posting has been successfully added!",
      });
      refetch()
    },
    onError() {
      notifications.show({
        position: 'bottom-center',
        withCloseButton: true,
        color: "red",
        title: "An error has occurred",
        message: "Try Again",
      });
    },
  });
  const { mutateAsync: getMetadata } = useGetMetadata({
    onSuccess: (res) => console.log("getMetadata onSuccess", res),
    onError: (err) => console.log("getMetadata onError", err)
  });
  const { mutateAsync: deleteLink } = useDeleteJobLink({
    onSuccess() {
      notifications.show({
        position: 'bottom-center',
        withCloseButton: true,
        color: "green",
        message: "Successfully deleted",
      });
      refetch()
    },
  });

  const addLinkItem = async ({ deadline, urlValue }: { deadline: JobPosting["deadline"], urlValue: JobPosting["url"] }) => {
    const metadata = await getMetadata({ url: urlValue })

    const newMetadata = {
      title: metadata?.title,
      description: metadata?.description,
      og: {
        image: metadata?.["og:image"]
      }
    }
    postJobPosting({
      id: crypto.randomUUID(),
      url: urlValue,
      deadline,
      metadata: newMetadata
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

  return (
    <Container>
      <Stack mt="xl" gap="md">
        <Title ff="monospace">Add your Job Posting Link</Title>
        <Stack>
          <Box>
            <Text
              size="xl"
              fw={500}
              variant={list && list?.length > 0 ? "gradient" : "text"}
            >
              Job Postings ({list?.length ?? "0"})
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