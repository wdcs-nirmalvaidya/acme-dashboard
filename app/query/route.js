import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL, {
  ssl: 'require',
  max: 1,              // 🔑 VERY IMPORTANT
  idle_timeout: 20,
  connect_timeout: 10,
});

async function listInvoices() {
  const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id;
  `;
  return data;
}

export async function GET() {
  try {
    const invoices = await listInvoices();
    return Response.json(invoices);
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch invoices' },
      { status: 500 }
    );
  }
}
