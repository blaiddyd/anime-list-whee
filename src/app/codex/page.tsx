import AnimeList from "../_components/AnimeList";
import { Suspense } from "react";

export default function Recommendations() {
  return (
    <Suspense>
        <AnimeList />
    </Suspense>
  );
}
