"use client";

import Image from "next/image";
import styles from "./page.module.css";

import { Link } from "@chakra-ui/next-js";
import ImageWithFallback from "./_components/ImageWithFallback";

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
