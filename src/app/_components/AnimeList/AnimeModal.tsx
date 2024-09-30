import {
  Avatar,
  Wrap,
  WrapItem,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

import { MediaFragment } from "../../../../generated/gql/graphql";

interface AnimeModalProps {
  anime: MediaFragment;
  isOpen: boolean;
  onClose: () => void;
}

export const AnimeModal = (props: AnimeModalProps) => {
  const { anime, onClose, isOpen } = props;

  return (
    <Modal
      blockScrollOnMount
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      size='xl'
    >
      <ModalOverlay
        bg="pinkAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent padding='10px'>
        <ModalHeader color='pink.500'>{anime.title?.userPreferred}</ModalHeader>
        <Tabs size="md" variant="enclosed">
          <TabList>
            <Tab>About</Tab>
            <Tab>Reviews</Tab>
          </TabList>
          <ModalCloseButton />
          <TabPanels>
            <TabPanel>
              {anime.description && (
                <ModalBody
                  dangerouslySetInnerHTML={{ __html: anime.description }}
                />
              )}
            </TabPanel>
            <TabPanel>
              <ModalBody>
                <Accordion>
                  {anime.reviews?.edges
                    ?.toSpliced(0, 3)
                    .map((review, index) => (
                      <AccordionItem key={`review-${index}`}>
                        <AccordionButton>
                          <Wrap spacing="30px">
                            <WrapItem>
                              {review?.node?.user?.avatar?.medium && (
                                <Avatar
                                  src={review?.node?.user?.avatar?.medium}
                                />
                              )}
                            </WrapItem>
                            <WrapItem>{review?.node?.user?.name}</WrapItem>
                            <WrapItem>Score: {review?.node?.score}</WrapItem>

                            <WrapItem>
                              {review?.node?.body && <AccordionIcon />}
                            </WrapItem>
                          </Wrap>
                        </AccordionButton>

                        {review?.node?.body && (
                          <AccordionPanel
                            pb={4}
                            dangerouslySetInnerHTML={{
                              __html: review?.node?.body,
                            }}
                          />
                        )}
                      </AccordionItem>
                    ))}
                </Accordion>
              </ModalBody>
            </TabPanel>
          </TabPanels>
          <ModalFooter>
            <Button
              colorScheme="pink"
              mr={3}
              variant="subtle"
              onClick={onClose}
            >
              I see...
            </Button>
          </ModalFooter>
        </Tabs>
      </ModalContent>
    </Modal>
  );
};
