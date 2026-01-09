import {
  fetchInvoiceById,
  updateInvoice,
  fetchCustomers
} from '../../../../lib/data';

import { redirect } from 'next/navigation';

export default async function Page(props) {
  const params = await props.params;
  const id = params.id;

  const invoice = await fetchInvoiceById(id);
  const customers = await fetchCustomers();

  if (!invoice) {
    return <p className="p-6 text-red-500">Invoice not found</p>;
  }

  async function handleUpdate(formData) {
    'use server';

    const customerId = formData.get('customer_id');
    const amount = formData.get('amount');
    const status = formData.get('status');

    await updateInvoice(id, customerId, amount, status);

    redirect('/dashboard/invoices');
  }

  return (
    <div className="p-6 max-w-md">
      <h1 className="text-xl font-bold mb-4">Edit Invoice</h1>

      <form action={handleUpdate} className="space-y-4">

        {/* CUSTOMER DROPDOWN */}
        <select
          name="customer_id"
          defaultValue={invoice.customer_id}
          className="border p-2 w-full"
        >
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>

        <input
          name="amount"
          defaultValue={invoice.amount}
          className="border p-2 w-full"
          required
        />

        <select
          name="status"
          defaultValue={invoice.status}
          className="border p-2 w-full"
        >
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
}
