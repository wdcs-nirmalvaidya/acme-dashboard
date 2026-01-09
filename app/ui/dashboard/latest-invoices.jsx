import { fetchLatestInvoices } from '../../lib/data';
import { lusitana } from '../fonts';

export default async function LatestInvoices() {
  const latestInvoices = await fetchLatestInvoices();
  console.log("🚀 ~ LatestInvoices ~ latestInvoices:", latestInvoices)
  

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl`}>
        Latest Invoices
      </h2>

      <div className="rounded-xl bg-gray-50 p-4">
        {latestInvoices.length === 0 ? (
          <p className="text-gray-400">No invoices available.</p>
        ) : (
          <ul>
            {latestInvoices.map((invoice, i) => (
              <li
                key={i}
                className="flex items-center justify-between border-b py-4 last:border-none"
              >
                {/* LEFT */}
                <div>
                  <p className="font-semibold">{invoice.name}</p>
                  <p className="text-sm text-gray-500">
                    {invoice.email}
                  </p>
                </div>

                {/* RIGHT */}
                <p className="font-semibold">
                  ₹{invoice.amount.toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
