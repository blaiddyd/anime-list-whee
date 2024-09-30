"use client";

import { ApolloProvider } from "@apollo/client/react";
import { ChakraProvider } from "@chakra-ui/react";
import React, { createContext, useContext, useEffect, useState } from "react";

import client from "./apolloClient";

interface UserInfo {
  username: string;
  jobTitle: string;
}

interface SessionContextType {
  isLoggedIn: boolean;
  userInfo: UserInfo | null;
}

export const ChakraWrapper = ({ children }: { children: React.ReactNode }) => {
  return <ChakraProvider>{children}</ChakraProvider>;
};

export const ApolloWrapper = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const response = await fetch("/api/login");
      const sessionInfo = (await response.json()).session;
      setIsLoggedIn(!!sessionInfo);
      setUserInfo(sessionInfo ? JSON.parse(sessionInfo.value) : null);
    };

    getSession();
  }, []);

  return (
    <SessionContext.Provider value={{ isLoggedIn, userInfo }}>
      {children}
    </SessionContext.Provider>
  );
};


export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
