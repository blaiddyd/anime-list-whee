"use client";

import { Container, useToast } from "@chakra-ui/react";
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
import { MediaList } from "./types";
import { POPULAR_ANIME_QUERY } from "./queries";

export const AnimeListWrapper = () => {
  const toast = useToast()
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const [currentPage, setCurrentPage] = useState(
    parseFloat(searchParams.get("page") || "1")
  );
  const [animeData, setAnimeData] = useState<MediaList>();
  const [loadingState, setLoadingState] = useState<boolean>(true);
  const router = useRouter();

  const { refetch, loading } = useQuery<PopularAnimeQueryQuery>(
    POPULAR_ANIME_QUERY,
    {
      variables: {
        page: 1,
        perPage: 6,
      },
      onError(error) {
         toast({title: error.name || "Something went wrong while fetching anime data", status: "error" }) 
      },
      onCompleted(data) {
        setAnimeData(data.popular?.media);
        
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
      setAnimeData(data.popular?.media);
      setLoadingState(loading);
    },
    [refetch]
  );

  useEffect(() => {
    setCurrentPage(parseFloat(searchParams.get("page") || "1"));
  }, [searchParams.get("page")]);

  useEffect(() => {
    router.push(`${pathName}?page=${currentPage}`);
  }, [pathName, currentPage, router]);

  useEffect(() => {
    refetchData(currentPage);
  }, [currentPage, refetchData]);

  return (
    <div>
      {loadingState ? (
        <Loader />
      ) : (
        <Container maxW="2xl" centerContent>
          <Pagination
            currentPage={currentPage}
            totalPages={100}
          />
          {animeData?.map((anime) => (
            <AnimeCard
              anime={anime as unknown as MediaFragment}
              key={(anime as unknown as MediaFragment).id}
            />
          ))}
          <Pagination
            currentPage={currentPage}
            totalPages={100}
          />
        </Container>
      )}
    </div>
  );
};
