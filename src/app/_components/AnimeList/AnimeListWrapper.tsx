"use client";

import { Box } from "@chakra-ui/react";
import { useEffect, useState, useCallback } from "react";
import { useQuery, gql, ApolloError } from "@apollo/client";
import { Suspense } from "react";
import Loader from "../Loader";
import { Pagination } from "./Pagination";

import {
  Page,
  PopularAnimeQueryQuery,
} from "../../../../generated/gql/graphql";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimeListInner } from "./AnimeListInner";
import { MediaList, PageInfo } from "./types";

const POPULAR_ANIME_QUERY = gql`
  query PopularAnimeQuery($page: Int, $perPage: Int) {
    popular: Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }

      media(sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
        id
        title {
          userPreferred
        }
        coverImage {
          extraLarge
          large
          color
        }
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
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
        mediaListEntry {
          id
          status
        }
        nextAiringEpisode {
          airingAt
          timeUntilAiring
          episode
        }
        studios(isMain: true) {
          edges {
            isMain
            node {
              id
              name
            }
          }
        }
      }
    }
  }
`;

export const AnimeListWrapper = () => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const [currentPage, setCurrentPage] = useState(
    parseFloat(searchParams.get("page") || "1")
  );
  const [animeData, setAnimeData] = useState<MediaList>();
  const [pageInfo, setPageInfo] = useState<PageInfo>();
  const [errorState, setErrorState] = useState<ApolloError>();
  const router = useRouter();

  const { data, error, refetch } = useQuery<PopularAnimeQueryQuery>(
    POPULAR_ANIME_QUERY,
    {
      variables: {
        page: 1,
        perPage: 6,
      },
      onError(error) {
          setErrorState(error)
      },
      onCompleted(data) {
        setAnimeData(data.popular?.media);
        setPageInfo(data.popular?.pageInfo);
      },
    }
  );

  const refetchData = useCallback(
    async (currentPageNumber: number) => {
      const { data, error } = await refetch({ page: currentPageNumber, perPage: 6 });
      setAnimeData(data.popular?.media)
      setPageInfo(data.popular?.pageInfo)
      setErrorState(error)
    },
    [refetch]
  );

  useEffect(() => {
    setCurrentPage(parseFloat(searchParams.get("page") || "1"));
  }, [searchParams.get("page")]);

  useEffect(() => {
    router.push(`${pathName}?page=${currentPage}`);
  }, [pathName, currentPage]);

  useEffect(() => {
    refetchData(currentPage)
  }, [currentPage]);

  return (
    <Suspense fallback={<Loader />}>
      <AnimeListInner animeList={animeData} />
      <Pagination currentPage={currentPage} totalPages={pageInfo?.total || 0} />
    </Suspense>
  );
};
