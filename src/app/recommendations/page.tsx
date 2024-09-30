"use client";

import Image from "next/image";
import { Heading } from "@chakra-ui/react";
import { gql } from "@apollo/client";
import AnimeList from "../_components/AnimeList";

export default function Recommendations() {
  return (
    <div>
      <Heading as="h1" size="3xl" noOfLines={1} color='pink.500'>
        *~All Anime~*
      </Heading>
      <AnimeList />
    </div>
  );
}
