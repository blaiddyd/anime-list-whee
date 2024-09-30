"use client";

import styles from "./page.module.css";

import { Button } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";

export default function Home() {
  return (
     
      <div className={styles.page}>
          <Link href="/codex">
            <Button colorScheme="pink" size='lg'>
              Get started!
            </Button>
          </Link>
      </div>
  
  );
}
