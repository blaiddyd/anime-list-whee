import { PopularAnimeQueryQuery } from "../../../../generated/gql/graphql";

export type MediaList = NonNullable<PopularAnimeQueryQuery["popular"]>["media"];
export type PageInfo = NonNullable<
  PopularAnimeQueryQuery["popular"]
>["pageInfo"];

type MediaItem = MediaList extends (infer U)[] ? U : never;

export type SingleAnimeItem = MediaItem extends { __typename?: 'Media' } & { ' $fragmentRefs'?: { 'MediaFragment': infer F } } 
  ? F 
  : never;