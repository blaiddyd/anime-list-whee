import { gql } from "@apollo/client";

export const POPULAR_ANIME_QUERY = gql`
  query PopularAnime {
  popular: Page(page: 1, perPage: 6) {
    media(sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
      bannerImage
      season
      seasonYear
      description
      type
      format
      status(version: 2)
      episodes
      duration
      chapters
      volumes
      genres
      isAdult
      averageScore
      popularity
    }
  }
}
`;
