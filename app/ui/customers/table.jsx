import { fetchCustomers } from '../../lib/data';

export default async function CustomersTable({ query }) {
  const customers = await fetchCustomers(query);

  // safety check
  if (!Array.isArray(customers)) {
    return <p>No customers found</p>;
  }

  return (
    <div className="mt-6">
      <table className="w-full text-sm">
        <thead className="border-b">
          <tr>
            <th className="py-2 text-left">Name</th>
            <th className="text-left">Email</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} className="border-b">
              <td className="py-3">{customer.name}</td>
              <td className="text-gray-600">{customer.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
