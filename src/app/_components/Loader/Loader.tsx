import { Spinner, Center, Flex } from "@chakra-ui/react";

export const Loader = () => {
  return (
    <Center h="100%">
      <Flex alignItems="center" gap="2">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="pink.500"
          size="xl"
        />
        Loading greatness...
      </Flex>
    </Center>
  );
};
