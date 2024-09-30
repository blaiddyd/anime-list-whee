"use client";

import { Container, useToast, Box } from "@chakra-ui/react";
import { useEffect, useState, useCallback } from "react";
import { useQuery, ApolloError } from "@apollo/client";
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
import ImageWithFallback from "../ImageWithFallback";

export const AnimeListWrapper = () => {
  const toast = useToast();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const [currentPage, setCurrentPage] = useState(
    parseFloat(searchParams.get("page") || "1")
  );
  const [animeData, setAnimeData] = useState<MediaList>();
  const [loadingState, setLoadingState] = useState<boolean>(true);
  const [errorState, setErrorState] = useState<ApolloError>();
  const router = useRouter();

  const { refetch, loading } = useQuery<PopularAnimeQueryQuery>(
    POPULAR_ANIME_QUERY,
    {
      variables: {
        page: 1,
        perPage: 6,
      },
      onError(error) {
        toast({
          title: error.name || "Something went wrong while fetching anime data",
          status: "error",
        });
        setErrorState(error);
      },
      onCompleted(data) {
        setAnimeData(data.popular?.media);
      },
    }
  );

  useEffect(() => {
    setLoadingState(loading);
  }, [loading]);

  const refetchData = useCallback(
    async (currentPageNumber: number) => {
      setLoadingState(true);
      const { data } = await refetch({
        page: currentPageNumber,
        perPage: 6,
      });
      setAnimeData(data.popular?.media);
      setLoadingState(false);
    },
    [refetch]
  );

  useEffect(() => {
    const pageParam = searchParams.get("page");
    if (pageParam) {
      setCurrentPage(parseFloat(pageParam));
    }
  }, [searchParams]);

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
        <Container maxW="2xl" centerContent paddingTop='50px'>
          {errorState ? (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDir="column"
              height="100vh"
              color="white"
            >
              <ImageWithFallback
                fallbacksrc="https://via.placeholder.com/500x700"
                src="https://media.tenor.com/uf7_N1qNQtsAAAAM/spy-family-anya.gif"
                height={700}
                width={500}
                alt="Anya crying because of error"
              />
              <p>Something went wrong! Please try again.</p>
            </Box>
          ) : (
            <div>
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
            </div>
          )}
        </Container>
      )}
    </div>
  );
};
