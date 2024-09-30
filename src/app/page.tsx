"use client";

import { Button, Box } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import ImageWithFallback from "./_components/ImageWithFallback";

export default function Home() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
      height="100vh"
      color="white"
      gap="20px"
    >
      <ImageWithFallback
        src="https://64.media.tumblr.com/699e57cbb99f3a07a7cf4d7f0d7847f8/47f8b31a600dcc3b-a5/s400x600/7d38b0a4e60639322098cfd812010f02275280c0.gifv"
        width={500}
        height={700}
        alt="frieren yay"
        fallbacksrc="https://via.placeholder.com/700x500"
      />
      <Link href="/codex">
        <Button colorScheme="pink" size="lg">
          Get started!
        </Button>
      </Link>
    </Box>
  );
}
