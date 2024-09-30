import { useEffect, useState } from "react";
import { Link } from "@chakra-ui/next-js";
import { usePathname } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export const Pagination = (props: PaginationProps) => {
  const pathName = usePathname();
  const { currentPage, totalPages } = props;
  const [pages, setPages] = useState<number[]>([]);

  useEffect(() => {
    const pagesList = [];
    for (let i = 1; i <= totalPages; i++) {
      pagesList.push(i);
    }
    setPages(pagesList);
  }, [props.totalPages]);

  return (
    <div className="pagination-container">
      {currentPage > 1 && (
        <Link href={`${pathName}?page=${currentPage - 1}`}>{"<"}</Link>
      )}
      {pages.map((page) => (
        <Link
          href={`${pathName}?page=${page}`}
          className={currentPage === page ? "isActive" : ""}
          key={page}
        >
          {page}
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link href={`${pathName}?page=${currentPage + 1}`}>{">"}</Link>
      )}
    </div>
  );
};
