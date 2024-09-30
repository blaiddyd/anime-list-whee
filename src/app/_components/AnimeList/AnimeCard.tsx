import {
  Box,
  Button,
  Heading,
  Text,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useState, useCallback } from "react";

import { MediaFragment } from "../../../../generated/gql/graphql";
import { AnimeModal } from "./AnimeModal";
import ImageWithFallback from "../ImageWithFallback";

interface AnimeListInnerProps {
  anime: MediaFragment;
}

export const AnimeCard = (props: AnimeListInnerProps) => {
  const { anime } = props;
  const [selectedAnime, setSelectedAnime] = useState<MediaFragment>();

  const onButtonClick = useCallback(
    (anime: MediaFragment) => {
      setSelectedAnime(anime);
    },
    [setSelectedAnime]
  );

  const onCloseModal = useCallback(() => {
    setSelectedAnime(undefined);
  }, [setSelectedAnime]);

  return (
    <Box display="flex" alignItems="baseline" p="6">
      <Card padding='10px'>
        <CardHeader>
          <Heading size="lg" color="pink.500">
            {" "}
            {anime?.title?.userPreferred}
          </Heading>
        </CardHeader>
        {anime.bannerImage && (
          <ImageWithFallback
            src={anime.bannerImage}
            alt={`Banner image for ${anime?.title?.userPreferred}`}
            style={{
              objectFit: "cover",
            }}
            width={700}
            height={500}
            fallbackSrc="https://via.placeholder.com/700"
          />
        )}
        <CardBody>
          <Wrap spacing="5px">
            <WrapItem>
              <Wrap spacing="2px">
                <WrapItem>
                  <StarIcon color='pink.300'/>{" "}
                </WrapItem>
                <WrapItem>
                  <Text>{anime.averageScore}</Text>
                </WrapItem>
              </Wrap>
            </WrapItem>
            <WrapItem>
              {anime.description && (
                <Text
                  noOfLines={3}
                  dangerouslySetInnerHTML={{ __html: anime.description }}
                />
              )}
            </WrapItem>
            <WrapItem></WrapItem>
          </Wrap>
        </CardBody>
        <CardFooter>
          <Button
            variant="solid"
            colorScheme="pink"
            onClick={() => onButtonClick(anime)}
          >
            See details!
          </Button>
        </CardFooter>
      </Card>
      {selectedAnime && (
        <AnimeModal
          anime={selectedAnime}
          onClose={onCloseModal}
          isOpen={selectedAnime !== null}
        />
      )}
    </Box>
  );
};
