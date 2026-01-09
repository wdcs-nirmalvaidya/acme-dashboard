import { fetchCardData } from '../../lib/data';

export function Card({ title, value }) {
  return (
    <div className="rounded-xl bg-gray-50 p-4">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}

export default async function CardWrapper() {
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();

  return (
    <>
      <Card title="Collected" value={totalPaidInvoices} />
      <Card title="Pending" value={totalPendingInvoices} />
      <Card title="Total Invoices" value={numberOfInvoices} />
      <Card title="Total Customers" value={numberOfCustomers} />
    </>
  );
}
  