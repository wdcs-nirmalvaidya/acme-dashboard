import Search from '../../ui/search';
import CustomersTable from '../../ui/customers/table';

export const metadata = {
  title: 'Customers',
};

export default async function Page({ searchParams }) {

  // ✅ FIX: unwrap promise
  const params = await searchParams;
  const query = params?.query || '';

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Customers</h1>

      <Search placeholder="Search customers..." />

      <CustomersTable query={query} />
    </div>
  );
}
