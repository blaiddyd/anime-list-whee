import { useEffect, useState } from "react";
import { Square } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { usePathname } from "next/navigation";

import styles from "./animelist.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export const Pagination = (props: PaginationProps) => {
  const { currentPage, totalPages } = props;
  const pathName = usePathname();
  const [pages, setPages] = useState<number[]>([]);

  useEffect(() => {
    const generatePages = () => {
      const pagesList: number[] = [];
      const maxVisiblePages = 5; // Maximum number of visible page links
      const halfVisible = Math.floor(maxVisiblePages / 2);

      // Start and end range for pagination
      let start = Math.max(1, currentPage - halfVisible);
      let end = Math.min(totalPages, currentPage + halfVisible);

      // Adjust start and end if near boundaries
      if (currentPage <= halfVisible) {
        end = Math.min(maxVisiblePages, totalPages);
      } else if (currentPage + halfVisible > totalPages) {
        start = Math.max(totalPages - maxVisiblePages + 1, 1);
      }

      // Populate the pages array
      for (let i = start; i <= end; i++) {
        pagesList.push(i);
      }

      return pagesList;
    };

    setPages(generatePages());
  }, [currentPage, totalPages]);

  return (
    <div className={styles["pagination-container"]}>
      {currentPage > 1 && (
        <Link href={`${pathName}?page=${currentPage - 1}`}>
          <Square color="black" bg="pink" padding='5px'>
            {"<"}
          </Square>
        </Link>
      )}

      {pages[0] > 1 && (
        <>
          <Link href={`${pathName}?page=1`}>1</Link>
          {pages[0] > 2 && <span>...</span>}
        </>
      )}

      {pages.map((page) => (
        <Link
          href={`${pathName}?page=${page}`}
          className={currentPage === page ? "isActive" : ""}
          key={page}
        >
          <Square color="black" bg="pink" padding='5px'>
            {page}
          </Square>
        </Link>
      ))}

      {pages[pages.length - 1] < totalPages && (
        <>
          {pages[pages.length - 1] < totalPages - 1 && <span>...</span>}
          <Link href={`${pathName}?page=${totalPages}`}>
            <Square color="black" bg="pink" padding='5px'>
              {totalPages}{" "}
            </Square>
          </Link>
        </>
      )}

      {currentPage < totalPages && (
        <Link href={`${pathName}?page=${currentPage + 1}`}>
          <Square color="black" bg="pink" padding='5px'>
            {">"}
          </Square>
        </Link>
      )}
    </div>
  );
};
