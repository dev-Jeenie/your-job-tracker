import { Box, Flex, Stack, Text } from "@mantine/core"
import Image from "next/image"


export const Section = ({image, text, title}:{
    image:any,
    text:string[],
    title?:string
}) => {
    return (
        <Flex h={500}>
            <Stack justify="center" gap="xs" flex={1} miw="150px" pl="80px">
            {title && 
                <Text fw="lighter" size="xl">{title}</Text>
            }
                {text.map((v) => <Text key={v} fw="lighter" size="xl">{v}</Text>)}
            </Stack>
            <Image src={image} alt="image1" style={{flex:1, objectFit: "contain", height:"100%"}} />
        </Flex>
    )
}