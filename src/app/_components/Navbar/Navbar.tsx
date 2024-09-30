"use client";

import { Box, Flex, HStack, Button } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { useSession } from "@/app/providers";

const Navbar = () => {
  const { isLoggedIn } = useSession()

  return (
    <Box
      as="nav"
      position="fixed"
      top="0"
      left="0"
      right="0"
      bg="purple.500"
      zIndex="1000"
      p={4}
    >
      <Flex align="center" justify="space-between">
        <Link href="/" color="white" fontWeight="bold">
          Anime Codex
        </Link>

        <HStack spacing={4}>
          {isLoggedIn && (
            <Link href="/profile" color="white">
              Profile
            </Link>
          )}
          <Button colorScheme="teal" variant="outline" color="white">
            {isLoggedIn ? (
              <Link href="/codex">Codex</Link>
            ) : (
              <Link href="/login">Login</Link>
            )}
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
