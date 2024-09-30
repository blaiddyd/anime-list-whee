"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation"; // Import useRouter
import { useSession } from "../providers";

const ProfilePage = () => {
  const toast = useToast();
  const router = useRouter(); // Initialize useRouter

  const { userInfo, setSession } = useSession();
  const [username, setUsername] = useState(userInfo?.username || "");
  const [jobTitle, setJobTitle] = useState(userInfo?.jobTitle || "");
  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      router.push("/login?redirect=profile");
    }
  }, [userInfo, router]);

  const validateInput = (input: string) => {
    const regex = /^[a-zA-Z0-9- ]+$/;
    return regex.test(input);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !jobTitle) {
      toast({
        title: "Both fields are required.",
        status: "error",
      });
      return;
    }

    if (!validateInput(username) || !validateInput(jobTitle)) {
      toast({
        title: "Invalid input. Only alphanumeric characters are allowed.",
        status: "error",
      });
      return;
    }

    setLoadingState(true);

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, jobTitle }),
    });

    if (!response.ok) {
      const error = await response.json();
      toast({
        title: error.message || "Failed to update profile",
        status: "error",
      });
    } else {
      setSession(username, jobTitle);
      toast({ title: "Profile updated successfully!", status: "success" });
    }
    setLoadingState(false);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      padding="4"
    >
      <Box
        bg="white"
        borderRadius="md"
        boxShadow="lg"
        p="8"
        width={{ base: "90%", sm: "400px" }}
      >
        <Heading as="h1" size="lg" mb="6" textAlign="center">
          Update Profile
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel htmlFor="username">Name</FormLabel>
              <Input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your name"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="jobTitle">Job Title</FormLabel>
              <Input
                type="text"
                id="jobTitle"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Your job title"
              />
            </FormControl>
            <Button
              type="submit"
              colorScheme="pink"
              width="full"
              isLoading={loadingState}
            >
              Update
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default ProfilePage;
