import { Suspense } from 'react';

import {
  fetchLatestInvoices,
  fetchCardData,
} from '../lib/data';

import { Card } from '../ui/dashboard/cards';
import RevenueChart from '../ui/dashboard/revenue-chart';
import LatestInvoices from '../ui/dashboard/latest-invoices';
import {
  CardsSkeleton,
  RevenueChartSkeleton,
} from '../ui/skeletons';

export const metadata = {
  title: 'Dashboard',
};

export default async function Page() {

  const [
    {
      numberOfInvoices,
      numberOfCustomers,
      totalPaidInvoices,
      totalPendingInvoices,
    },
    latestInvoices,
  ] = await Promise.all([
    fetchCardData(),
    fetchLatestInvoices(),
  ]);

  return (
    <main>

      <h1 className="text-2xl font-bold mb-6">
        Dashboard
      </h1>

      {/* TOP CARDS */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card title="Total Customers" value={numberOfCustomers} type="customers" />
      </div>

      {/* GRAPH + LATEST INVOICES */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">

        {/* LEFT SIDE - GRAPH */}
        <div className="md:col-span-2">
          <Suspense fallback={<RevenueChartSkeleton />}>
            <RevenueChart />
          </Suspense>
        </div>

        {/* RIGHT SIDE - LATEST INVOICES */}
        <div className="md:col-span-1">
          <Suspense fallback={<CardsSkeleton />}>
            <LatestInvoices invoices={latestInvoices} />
          </Suspense>
        </div>

      </div>

    </main>
  );
}
