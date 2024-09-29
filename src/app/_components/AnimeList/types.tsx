import { PopularAnimeQueryQuery } from "../../../../generated/gql/graphql";

export type MediaList = NonNullable<PopularAnimeQueryQuery["popular"]>["media"];
export type PageInfo = NonNullable<
  PopularAnimeQueryQuery["popular"]
>["pageInfo"];
