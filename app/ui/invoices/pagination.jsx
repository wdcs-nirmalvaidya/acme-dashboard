'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { usePathname, useSearchParams } from 'next/navigation';
import { generatePagination } from '../../lib/utils';

export default function Pagination({ totalPages }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    return `${pathname}?${params.toString()}`;
  };

  const pages = generatePagination(currentPage, totalPages);

  return (
    <div className="flex items-center gap-2">
      {/* Previous */}
      <Link
        href={createPageURL(currentPage - 1)}
        className={clsx(
          'rounded-md p-2',
          currentPage === 1 && 'pointer-events-none opacity-50'
        )}
      >
        <ArrowLeftIcon className="h-4 w-4" />
      </Link>

      {/* Page Numbers */}
      {pages.map((page, i) =>
        page === '...' ? (
          <span key={i} className="px-2 text-gray-400">
            ...
          </span>
        ) : (
          <Link
            key={i}
            href={createPageURL(page)}
            className={clsx(
              'rounded-md px-3 py-1 text-sm',
              page === currentPage
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            )}
          >
            {page}
          </Link>
        )
      )}

      {/* Next */}
      <Link
        href={createPageURL(currentPage + 1)}
        className={clsx(
          'rounded-md p-2',
          currentPage === totalPages && 'pointer-events-none opacity-50'
        )}
      >
        <ArrowRightIcon className="h-4 w-4" />
      </Link>
    </div>
  );
}
