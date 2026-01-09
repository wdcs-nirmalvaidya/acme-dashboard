import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

const ITEMS_PER_PAGE = 6;

// =======================
// 👤 CUSTOMERS
// =======================
export async function fetchCustomers(query = '') {
  try {
    const result = await sql`
      SELECT id, name, email
      FROM customers
      WHERE
        name ILIKE ${'%' + query + '%'}
        OR email ILIKE ${'%' + query + '%'}
      ORDER BY name ASC
    `;

    // FIX: always return array
    return Array.isArray(result) ? result : result.rows || [];
    
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
}


// =======================
// 📊 REVENUE
// =======================
export async function fetchRevenue() {
  try {
    const data = await sql`
SELECT
  month,
  SUM(revenue) AS revenue
FROM revenue
GROUP BY month
ORDER BY
  CASE month
    WHEN 'Jan' THEN 1
    WHEN 'Feb' THEN 2
    WHEN 'Mar' THEN 3
    WHEN 'Apr' THEN 4
    WHEN 'May' THEN 5
    WHEN 'Jun' THEN 6
    WHEN 'Jul' THEN 7
    WHEN 'Aug' THEN 8
    WHEN 'Sep' THEN 9
    WHEN 'Oct' THEN 10
    WHEN 'Nov' THEN 11
    WHEN 'Dec' THEN 12
  END;
    `;
    return data.rows;
  } catch (error) {
    console.error('❌ fetchRevenue failed:', error);
    return [];
  }
}

// =======================
// 🧾 LATEST INVOICES
// =======================
export async function fetchLatestInvoices() {
  try {
    const data = await sql`
      SELECT
        invoices.amount,
        customers.name,
        customers.email
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5
    `;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch latest invoices.');
  }
}

// =======================
// 📦 CARDS DATA
// =======================
export async function fetchCardData() {
  try {
    const invoiceCount = await sql`
      SELECT COUNT(*)::int AS count FROM invoices
    `;

    const customerCount = await sql`
      SELECT COUNT(*)::int AS count FROM customers
    `;

    const invoiceStatus = await sql`
      SELECT
        COALESCE(SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END), 0) AS paid,
        COALESCE(SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END), 0) AS pending
      FROM invoices
    `;

    return {
      numberOfInvoices: invoiceCount.rows[0].count,
      numberOfCustomers: customerCount.rows[0].count,
      totalPaidInvoices: invoiceStatus.rows[0].paid,
      totalPendingInvoices: invoiceStatus.rows[0].pending,
    };
  } catch (error) {
    console.error('Database Error (fetchCardData):', error);
    return {
      numberOfInvoices: 0,
      numberOfCustomers: 0,
      totalPaidInvoices: 0,
      totalPendingInvoices: 0,
    };
  }
}

// =======================
// 🔍 FILTERED INVOICES
// =======================
export async function fetchFilteredInvoices(query, currentPage) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const data = await sql`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.status,
        invoices.date,
        customers.name,
        customers.email
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`}
        OR customers.email ILIKE ${`%${query}%`}
        OR invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

// =======================
// 📄 TOTAL PAGES
// =======================
export async function fetchInvoicesPages(query) {
  try {
    const data = await sql`
      SELECT COUNT(*)::int AS count
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`}
        OR customers.email ILIKE ${`%${query}%`}
        OR invoices.status ILIKE ${`%${query}%`}
    `;

    return Math.ceil(data.rows[0].count / ITEMS_PER_PAGE);
  } catch (error) {
    console.error('❌ fetchInvoicesPages error:', error);
    return 1;
  }
}

// =======================
// 🗑 DELETE INVOICE
// =======================
export async function deleteInvoice(id) {
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath('/dashboard/invoices');
  revalidatePath('/dashboard');
}

// =======================
// ✏️ GET INVOICE
// =======================
export async function fetchInvoiceById(id) {
  const data = await sql`
    SELECT id, amount, status, customer_id
    FROM invoices
    WHERE id = ${id}
  `;
  return data.rows[0];
}

// =======================
// ✏️ UPDATE INVOICE
// =======================
export async function updateInvoice(id, customerId, amount, status) {
  await sql`
    UPDATE invoices
    SET customer_id = ${customerId},
        amount = ${amount},
        status = ${status}
    WHERE id = ${id}
  `;

  revalidatePath('/dashboard/invoices');
  revalidatePath('/dashboard');
}
