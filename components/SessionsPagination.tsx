import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination';

interface SessionsPaginationProps {
  currentPage: number;
  pageCount: number;
}

export function SessionsPagination({ currentPage, pageCount }: SessionsPaginationProps) {
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <Pagination className="mt-8 justify-center">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`?page=${currentPage - 1}`}
            aria-disabled={currentPage <= 1}
            className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>

        {pages.map((pg, i) => {
          const isActive = pg === currentPage;

          // Show first, last, and ±1 around current
          if (pg === 1 || pg === pageCount || Math.abs(pg - currentPage) <= 1) {
            return (
              <PaginationItem key={pg}>
                <PaginationLink href={`?page=${pg}`} isActive={isActive}>
                  {pg}
                </PaginationLink>
              </PaginationItem>
            );
          }

          // Ellipsis at the start
          if (i === 1 && currentPage > 4) {
            return (
              <PaginationItem key="start-ellipsis">
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          // Ellipsis at the end
          if (i === pageCount - 2 && currentPage < pageCount - 3) {
            return (
              <PaginationItem key="end-ellipsis">
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return null;
        })}

        <PaginationItem>
          <PaginationNext
            href={`?page=${currentPage + 1}`}
            aria-disabled={currentPage >= pageCount}
            className={currentPage >= pageCount ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
