"use client";

import { useSession } from "next-auth/react";
import { Box, Button, Container, Flex, FloatingIndicator, Group, Indicator, Paper, Stack, Text, TextInput, Title, UnstyledButton } from "@mantine/core";
import { DatePicker, DateTimePicker } from "@mantine/dates";
import "@mantine/dates/styles.css";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconCalendar, IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { ListCard } from "../_components/ListCard";
import { useDeleteJobLink } from "../network/endpoints/jobOpeningListDelete";
import { useGetJobsList } from "../network/endpoints/jobOpeningListGet";
import { useAddJobPosting } from "../network/endpoints/jobOpeningListPost";
import type { MetaData } from "../network/endpoints/metadataGet";
import { useGetMetadata } from "../network/endpoints/metadataGet";
import { urlValidator } from "../utils/urlValidator";
import classes from './list.module.css';

export interface JobPosting {
  id: string;
  url: string;
  deadline: Date;
  userEmail?:string;
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
      <Flex align="flex-end" justify="space-between" gap="md">
          <Group flex={1}>
          <TextInput
            flex={1}
            w="100%"
            size="xl"
            label="채용공고 링크를 입력하세요."
            placeholder="add your Job Posting link"
            key={form.key("url")}
            {...form.getInputProps("url")}
          />
          <DateTimePicker
            size="xl"
            flex={1}
            maw={300}
            clearable
            highlightToday
            rightSection={<IconCalendar />}
            label="마감일을 입력하세요."
            placeholder="Select deadline"
            key={form.key("deadline")}
            {...form.getInputProps("deadline")}

          />
          </Group>
        <Button color="cyan" type="submit" size="lg">
          <IconPlus color="white"/>
        </Button>
      </Flex>
    </form>

  );
};

const ListPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
  const [active, setActive] = useState(0);
  const { data: session } = useSession();
  const userEmail = session?.user?.email || "";
  const { data: list, refetch } = useGetJobsList();
  const { mutateAsync: postJobPosting } = useAddJobPosting({
    onSuccess() {
      notifications.show({
        position: 'bottom-center',
        withCloseButton: true,
        color: "green",
        message: "채용공고가 등록되었습니다.",
      });
      refetch()
    },
    onError() {
      notifications.show({
        position: 'bottom-center',
        withCloseButton: true,
        color: "red",
        title: "Error",
        message: "오류가 발생했습니다. 다시 시도해주세요.",
      });
    },
  });
  const { mutateAsync: getMetadata } = useGetMetadata({
    onError: (err) => {
      notifications.show({
        position: 'bottom-center',
        withCloseButton: true,
        color: "red",
        title: "Error",
        message: "데이터를 찾을 수 없습니다. 다른 URL을 시도해보세요.",
      });
    }
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

  console.log("list",list)

  const addLinkItem = async ({ deadline, urlValue }: { deadline: JobPosting["deadline"], urlValue: JobPosting["url"] }) => {
    const metadata = await getMetadata({ url: urlValue })
    const newMetadata = {
      title: metadata?.title,
      description: metadata?.description,
      og: {
        image: metadata?.["og:image"]
      }
    }
    console.log("userEmail",userEmail)
      postJobPosting({
        id: crypto.randomUUID(),
        url: urlValue,
        deadline,
        userEmail:userEmail as string,
        metadata: newMetadata
      })
  };

  const deleteLinkItem = (targetId: string, url: string) => {
    if (confirm(`삭제하시겠습니까?`)) {
      deleteLink({id: targetId, userEmail:userEmail as string})
    }
  };


  const setControlRef = (index: number) => (node: HTMLButtonElement) => {
    controlsRefs[index] = node;
    setControlsRefs(controlsRefs);
  };

  const controls = ['list', 'calendar'].map((item, index) => (
    <UnstyledButton
      key={item}
      className={classes.control}
      ref={setControlRef(index)}
      onClick={() => setActive(index)}
      mod={{ active: active === index }}
      style={{padding:"14px 26px"}}
    >
      <span className={classes.controlLabel}>{item}</span>
    </UnstyledButton>
  ));
  

  return (
    <Container size="md" pt="130px">
      <Stack mt="xl" gap="xl">
        <Stack gap="lg">
          <Box>
            <Text
              size="xl"
              fw={500}
              variant={list && list?.length > 0 ? "gradient" : "text"}
            >
              내 채용공고 ({list?.length ?? "0"})
            </Text>
            <Text inline c="gray" size="lg">
              + 버튼을 눌러 채용공고를 등록하세요
            </Text>
          </Box>
          <LinkInput addItem={addLinkItem} />
        </Stack>
        <Flex>
          <Stack gap="xs">
          <Text fw="500" size="xl">보기방식 설정</Text>
          <div className={classes.root} ref={setRootRef}>
            {controls}
            <FloatingIndicator
              target={controlsRefs[active]}
              parent={rootRef}
              className={classes.indicator}
            />
          </div>
          </Stack>
        </Flex>
        {active === 0 ? 
          ( list && list.length > 0 ? list?.map(({ id, deadline, metadata, url,userEmail }) => {
            return (
              <ListCard
                userEmail={userEmail}
                key={id}
                id={id}
                metadata={metadata}
                url={url}
                deadline={deadline}
                deleteLinkItem={deleteLinkItem}
              />
            )
          }):
          <Paper shadow="sm" p="md" mb="xl" withBorder flex={1} h="100%">
          <Flex align="center" justify="center" h="300px">
            <Text size="lg">채용공고를 등록해보세요.</Text>
            </Flex>
          </Paper>)
         : 
        <Flex gap="md" pt="md">
          <DatePicker
          size="lg"
            value={selectedDate}
            onChange={setSelectedDate}
            renderDay={(date) => {
              const day = date.toISOString().split('T')[0];
              const deadlines = list?.map(job => job.deadline.toString().split('T')[0]);
              const isMarked = deadlines?.includes(day)
              return (
                <Indicator size={6} color="red" offset={-2} disabled={!isMarked}>
                  <div>{date.getDate()}</div>
                </Indicator>
              )
            }}
          />
          <Stack gap="xs" flex={1}>
          {selectedDate && list && list.length > 0 ? (
        (() => {
          const filteredJobs = list.filter(job => {
            const jobDeadline = new Date(job.deadline).toISOString().split('T')[0];
            const selectedDay = selectedDate.toISOString().split('T')[0];
            return jobDeadline === selectedDay;
          });
          return filteredJobs.length > 0 ? (
            filteredJobs.map(({ id, deadline, metadata, url,userEmail }) => (
              <ListCard
                userEmail={id}
                key={id}
                id={id}
                metadata={metadata}
                url={url}
                deadline={deadline}
                deleteLinkItem={deleteLinkItem}
              />
            ))
          ) : (
            <Paper shadow="sm" p="md" mb="xl" withBorder flex={1} h="100%">
              <Flex align="center" justify="center" h="100%">
                <Text size="lg">선택한 날짜에 등록된 채용공고가 없습니다.</Text>
              </Flex>
            </Paper>
          );
        })()
      ) : (
        <Paper shadow="sm" p="md" mb="xl" withBorder flex={1} h="100%">
        <Flex align="center" justify="center" h="100%">
          <Text size="lg">캘린더에서 날짜를 선택하세요</Text>
          </Flex>
        </Paper>
      )}
          </Stack>
        </Flex>
      }
      </Stack>
    </Container>
  )
}
export default ListPage