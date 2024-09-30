import { PopularAnimeQueryQuery } from "../../../../generated/gql/graphql";

export type MediaList = NonNullable<PopularAnimeQueryQuery["popular"]>["media"];