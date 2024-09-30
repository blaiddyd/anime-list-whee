"use client";

import { Suspense } from "react";
import localFont from "next/font/local";
import "./globals.css";
import { ChakraWrapper, ApolloWrapper, SessionProvider } from "./providers";
import { Box } from "@chakra-ui/react";
import Navbar from "./_components/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ApolloWrapper>
          <SessionProvider>
            <ChakraWrapper>
              <Suspense>
                <Navbar />
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexDir="column"
                  height="100%"
                  padding="4"
                  bgGradient="linear(to-r, purple.500, pink.500)"
                >
                  {children}
                </Box>
              </Suspense>
            </ChakraWrapper>
          </SessionProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}

export default RootLayout;
