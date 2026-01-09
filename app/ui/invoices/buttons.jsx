'use client';

import Link from 'next/link';
import { PencilIcon, PlusIcon } from '@heroicons/react/24/outline';

export function CreateInvoice() {
  return (
    <Link
      href="/dashboard/invoices/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-500"
    >
      <PlusIcon className="mr-2 h-5 w-5" />
      Create Invoice
    </Link>
  );
}

export function UpdateInvoice({ id }) {
  return (
    <Link
      href={`/dashboard/invoices/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="h-4 w-4 text-gray-600" />
    </Link>
  );
}
