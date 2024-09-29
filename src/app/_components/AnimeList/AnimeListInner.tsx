import {
  Box,
  Button,
  Container,
  Image,
  Text,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";

import { MediaList } from "./types";

interface AnimeListInnerProps {
  animeList: MediaList;
}

export const AnimeListInner = (props: AnimeListInnerProps) => {
  const { animeList } = props;

  return (
    <Container maxW='2xl' centerContent>
      {animeList?.map((anime) => (
        <Box display='flex' alignItems='baseline' p='6'>
          <Card>
            <CardHeader>
              
            </CardHeader>
            {
              anime?.bannerImage &&
              <Image 
                src={anime.bannerImage}
                alt={`Banner image for ${anime?.title?.userPreferred}`}
                maxW={{ base: '100%', sm: '700px' }}
                maxH={{ base: '100%', sm: '500px' }}
                objectFit="cover"
              />
            }
            <CardBody>
              <Text>
                {anime?.title?.userPreferred}
              </Text>
            </CardBody>
            <CardFooter>
              <Button variant='solid' colorScheme="">

              </Button>
            </CardFooter>
          </Card>
        </Box>
      ))}
    </Container>
  );
};
