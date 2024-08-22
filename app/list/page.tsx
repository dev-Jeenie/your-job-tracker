"use client";

import { Box, Container, Flex, Image, Stack, Text, TextInput, Title, UnstyledButton } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useState } from "react";

type linkItem = {
  id: string;
  image: string;
  link: string;
}


const LinkInput = ({ addItem }: { addItem: (data: linkItem) => void }) => {
  const [linkValue, setlinkValue] = useState<linkItem>({ id: "", image: "", link: "" })


  return (
    <Flex align="center" justify="space-between" gap="sm">
      <TextInput
        flex={1}
        size="lg"
        placeholder="add your JO link"
        onChange={(v) =>
          setlinkValue({ id: "", image: "", link: v.target.value })}
        value={linkValue.link}
      />
      <UnstyledButton onClick={() => addItem(linkValue)}>
        <IconPlus color="grey" />
      </UnstyledButton>
    </Flex>
  );
};
export default function ListPage() {

  const form = useForm<{ list?: linkItem[] }>({
    mode: "uncontrolled", initialValues: {
      list: undefined
    },
    onValuesChange: (values) => console.log("values", values)
  })



  const results = form.getValues().list || [];

  const addLinkItem = (data: linkItem) => {
    if (data) {
      console.log("data", data)
      form.setValues((prev) => ({
        list: [...prev.list || [], data]
      }))
    }
  };

  const deleteRequirementItem = () => { };

  return (
    <Container>
      <Box mt="xl">
        <Title>Add your Job Opening Link</Title>
        <Box>
          <Text
            variant={results?.length > 0 ? "gradient" : "text"}
            style={{ fontWeight: "500" }}
          >
            Job Openings ({results?.length})
          </Text>
          <Text inline style={{ color: "gray" }} size="sm">
            Click plus button to add requirement
          </Text>
        </Box>
        <LinkInput addItem={addLinkItem} />
        <Stack gap="md" pt="md">
          {results?.map(({ id, image, link }) => (
            <Flex key={id} align="center" justify="space-between" gap="sm">
              <Flex gap="md">
                <Image
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                  height={100}
                  alt={link}
                />
                <Box>
                  <Text>{id}</Text>
                  <Text fw="bold">{link}</Text>
                  <Text >description</Text>
                </Box>
              </Flex>
              <UnstyledButton onClick={() => deleteRequirementItem()}>
                <IconTrash color="grey" />
              </UnstyledButton>
            </Flex>
          ))}
        </Stack>
      </Box>
    </Container>
  )
  // );
}
