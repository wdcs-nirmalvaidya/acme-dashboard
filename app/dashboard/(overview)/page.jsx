export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import { lusitana } from '../../ui/fonts';
import CardWrapper from '../../ui/dashboard/cards';
import LatestInvoices from '../../ui/dashboard/latest-invoices';
import RevenueChart from '../../ui/dashboard/revenue-chart';

import {
  CardsSkeleton,
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
} from '../../ui/skeletons';

export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>

      {/* ✅ Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>

      {/* ✅ Chart LEFT | Invoices RIGHT */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-8">
        {/* Revenue Chart → LEFT (5 cols) */}
        <div className="lg:col-span-5">
          <Suspense fallback={<RevenueChartSkeleton />}>
            <RevenueChart />
          </Suspense>
        </div>

        {/* Latest Invoices → RIGHT (3 cols) */}
        <div className="lg:col-span-3">
          <Suspense fallback={<LatestInvoicesSkeleton />}>
            <LatestInvoices />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
