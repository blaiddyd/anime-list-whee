"use client";

import { Container } from "@chakra-ui/react";
import { useEffect, useState, useCallback } from "react";
import { useQuery } from "@apollo/client";
import Loader from "../Loader";
import { Pagination } from "./Pagination";

import {
  MediaFragment,
  PopularAnimeQueryQuery,
} from "../../../../generated/gql/graphql";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimeCard } from "./AnimeCard";
import { MediaList, PageInfo } from "./types";
import { POPULAR_ANIME_QUERY } from "./queries";

export const AnimeListWrapper = () => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const [currentPage, setCurrentPage] = useState(
    parseFloat(searchParams.get("page") || "1")
  );
  const [animeData, setAnimeData] = useState<MediaList>();
  const [pageInfo, setPageInfo] = useState<PageInfo>();
  const [loadingState, setLoadingState] = useState<boolean>(true);
  // const [_errorState, setErrorState] = useState<ApolloError>();
  const router = useRouter();

  const { refetch, loading } = useQuery<PopularAnimeQueryQuery>(
    POPULAR_ANIME_QUERY,
    {
      variables: {
        page: 1,
        perPage: 6,
      },
      // onError(error) {
      //   setErrorState(error);
      // },
      onCompleted(data) {
        setAnimeData(data.popular?.media);
        setPageInfo(data.popular?.pageInfo);
      },
    }
  );

  useEffect(() => {
    setLoadingState(loading);
  }, [loading, setLoadingState]);

  const refetchData = useCallback(
    async (currentPageNumber: number) => {
      setLoadingState(true);
      const { data, loading } = await refetch({
        page: currentPageNumber,
        perPage: 6,
      });
      // Not great at all but what can you do :/
      setAnimeData(data.popular?.media);
      setPageInfo(data.popular?.pageInfo);
      // setErrorState(error);
      setLoadingState(loading);
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
    refetchData(currentPage);
  }, [currentPage]);

  return (
    <div>
      {loadingState ? (
        <Loader />
      ) : (
        <Container maxW="2xl" centerContent>
          {animeData?.map((anime) => (
            <AnimeCard
              anime={anime as unknown as MediaFragment}
              key={(anime as unknown as MediaFragment).id}
            />
          ))}
          <Pagination
            currentPage={currentPage}
            totalPages={pageInfo?.total || 0}
          />
        </Container>
      )}
    </div>
  );
};
