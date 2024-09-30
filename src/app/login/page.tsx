'use client'

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  useToast
} from "@chakra-ui/react";
import { useState, FormEvent } from "react";
import { useRouter } from 'next/navigation';
import { useSession } from "../providers";

export default function LoginPage() {
  const toast = useToast();
  const router = useRouter();
  const [loadingState, setLoadingState] = useState(false);
  const [username, setUsername] = useState("")
  const [jobTitle, setJobTitle] = useState("")
  const { setSession } = useSession()

  const validateInput = (input: string | null) => {
    const regex = /^[a-zA-Z0-9- ]+$/;
    return input !== null && regex.test(input);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingState(true);

    if (!username || !jobTitle) {
      toast({
        title: "Both fields are required.",
        status: "error",
      });
      setLoadingState(false);
      return;
    }

    if (!validateInput(username) || !validateInput(jobTitle)) {
      toast({
        title: "Invalid input. Only alphanumeric characters are allowed.",
        status: "error",
      });
      setLoadingState(false);
      return;
    }

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, jobTitle }),
    });

    if (!response.ok) {
      toast({ title: "Failed :( Please try again", status: "error" });
    } else {
      toast({ title: "Success! Redirecting you to the Codex", status: "success" });
      setSession(username, jobTitle)
      router.push("/codex");
    }
    setLoadingState(false);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
      height="100vh"
    >
      <Box
        bg="white"
        borderRadius="md"
        boxShadow="lg"
        p="8"
        width={{ base: "90%", sm: "400px" }}
      >
        <Heading as="h1" size="lg" mb="6" textAlign="center">
          Login
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input type="text" name="username" id="username" placeholder="kingweeb97" onChange={(e) => setUsername(e.target.value)}/>
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="job-title">Job Title</FormLabel>
              <Input type="text" name="job-title" id="job-title" placeholder="Your job title" onChange={(e) => setJobTitle(e.target.value)}/>
            </FormControl>
            <Button
              type="submit"
              colorScheme="pink"
              width="full"
              isLoading={loadingState === true}
            >
              Venture forth
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
}
