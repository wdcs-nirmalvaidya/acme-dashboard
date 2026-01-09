'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createInvoice(formData) {
  const customerId = formData.get('customerId');
  const amount = Number(formData.get('amount'));
  const status = formData.get('status');

  // Basic validation
  if (!customerId || !amount || !status) {
    throw new Error('Missing required fields');
  }

  // Insert invoice into DB
  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amount}, ${status}, NOW())
  `;

  // 🔄 Revalidate dashboard pages
  revalidatePath('/dashboard');
  revalidatePath('/dashboard/invoices');

  // 🔁 Redirect back to invoices list
  redirect('/dashboard/invoices');
}




// AUTH ACTION
import { signIn } from '../../auth';
import { AuthError } from 'next-auth';

export async function authenticate(prevState, formData) {
  try {
    await signIn('credentials', formData);
  } catch (error) {

    if (error instanceof AuthError) {
      if (error.type === 'CredentialsSignin') {
        return 'Invalid credentials';
      }
      return 'Something went wrong';
    }

    throw error;
  }
}
