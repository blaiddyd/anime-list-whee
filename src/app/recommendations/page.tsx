"use client";

import { Heading } from "@chakra-ui/react";
import AnimeList from "../_components/AnimeList";
import { Suspense } from "react";

export default function Recommendations() {
  return (
    <Suspense>
      <Heading as="h1" size="3xl" noOfLines={1} color='pink.500'>
        *~All Anime~*
      </Heading>
      <AnimeList />
    </Suspense>
  );
}
