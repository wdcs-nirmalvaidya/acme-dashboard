'use client';

import { useActionState } from 'react';
import { authenticate } from '../lib/actions';


export default function LoginForm() {

  const [error, formAction, pending] =
    useActionState(authenticate, undefined);

  return (
    <form action={formAction} className="space-y-3">

      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        className="border p-2 w-full"
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        required
        className="border p-2 w-full"
      />

      <button
        disabled={pending}
        className="bg-blue-500 text-white p-2 w-full"
      >
        {pending ? 'Logging...' : 'Login'}
      </button>

      {error && (
        <p className="text-red-500 text-sm">
          {error}
        </p>
      )}
    </form>
  );
}
