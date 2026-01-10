import { createInvoice } from '../../../lib/actions';
import { fetchCustomers } from '../../../lib/data';

export const metadata = {
  title: 'Create Invoice',
};

export default async function Page() {
  const customers = await fetchCustomers();

  return (
    <form action={createInvoice} className="space-y-4 max-w-md">
      {/* Customer */}
      <div>
        <label className="block mb-1">Choose customer</label>
        <select name="customerId" required className="border p-2 w-full">
          <option value="">Select a customer</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
      </div>

      {/* Amount */}
      <div>
        <label className="block mb-1">Amount</label>
        <input
          type="number"
          name="amount"
          required
          className="border p-2 w-full"
        />
      </div>

      {/* Status */}
      <div>
        <label className="block mb-1">Status</label>
        <select name="status" className="border p-2 w-full">
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <a href="/dashboard" className="border px-4 py-2">
          Cancel
        </a>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2"
        >
          Create Invoice
        </button>
      </div>
    </form>
  );
}
