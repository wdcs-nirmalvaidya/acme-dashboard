'use client';

import { useRouter } from 'next/navigation';
import Button from './button.jsx';
import { AtSymbolIcon, KeyIcon } from '@heroicons/react/24/outline';

export default function LoginForm() {
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();

    // 👉 later real auth will come here
    router.push('/dashboard');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col gap-4 rounded-lg bg-white p-6 shadow-md"
    >
      <h1 className="text-2xl font-semibold">Log in</h1>

      {/* Email */}
      <div className="relative">
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full rounded-lg border px-4 py-2 pl-10"
        />
        <AtSymbolIcon className="absolute left-3 top-2.5 h-5 text-gray-400" />
      </div>

      {/* Password */}
      <div className="relative">
        <input
          type="password"
          placeholder="Password"
          required
          className="w-full rounded-lg border px-4 py-2 pl-10"
        />
        <KeyIcon className="absolute left-3 top-2.5 h-5 text-gray-400" />
      </div>

      <Button type="submit">
        Log in
      </Button>
    </form>
  );
}
