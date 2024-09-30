"use client";

import styles from "./page.module.css";

import { Link } from "@chakra-ui/next-js";

export default function Home() {
  return (
    <div>
     
      <div className={styles.page}>
        <h1>Welcome to your cute anime recommender~!</h1>
        <Link href="/recommendations">Get started!</Link>
      </div>
    </div>
  );
}
