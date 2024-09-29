'use client'

import Image from "next/image";
import { gql } from "@apollo/client"
import AnimeList from "../_components/AnimeList";

const GET_POPULAR_ANIME = `
  query GetPopularAnime {

  }
`

export default function Recommendations() {
  return (
    <div>
      <h1>Recommendations</h1>
      <AnimeList />
    </div>
  );
}
