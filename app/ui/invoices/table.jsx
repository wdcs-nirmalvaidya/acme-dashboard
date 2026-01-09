import { fetchFilteredInvoices } from '../../lib/data';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteInvoice } from '../../lib/data';

export default async function InvoicesTable({ query, currentPage }) {
  const invoices = await fetchFilteredInvoices(query, currentPage);

  return (
    <table className="w-full text-sm">
      <thead className="border-b">
        <tr>
          <th className="py-2 text-left">Customer</th>
          <th>Email</th>
          <th>Amount</th>
          <th>Status</th>
          <th className="text-right">Actions</th>
        </tr>
      </thead>

      <tbody>
        {invoices.map((invoice) => (
          <tr key={invoice.id} className="border-b">
            <td className="py-3">{invoice.name}</td>
            <td>{invoice.email}</td>
            <td>₹{invoice.amount}</td>
            <td>{invoice.status}</td>

            <td className="flex justify-end gap-2 py-3">
              {/* ✏️ EDIT */}
              <Link
                href={`/dashboard/invoices/${invoice.id}/edit`}
                className="rounded-md border p-2 hover:bg-gray-100"
              >
                <PencilIcon className="h-4 w-4" />
              </Link>

              {/* 🗑 DELETE */}
              <form
                action={async () => {
                  'use server';
                  await deleteInvoice(invoice.id);
                }}
              >
                <button className="rounded-md border p-2 hover:bg-red-100">
                  <TrashIcon className="h-4 w-4 text-red-600" />
                </button>
              </form>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
