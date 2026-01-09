import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL, {
  ssl: 'require',
});

async function getUser(email) {
  const user =
    await sql`SELECT * FROM users WHERE email=${email}`;
  console.log("🚀 ~ getUser ~ user:", user[0])
  return user[0];
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,

  providers: [
    Credentials({
      async authorize(credentials) {
      console.log("🚀 ~ credentials:", credentials)

        const parsed = z.object({
          email: z.string().email(),
          password: z.string().min(6),
        }).safeParse(credentials);
        
        console.log("🚀 ~ parsed:", parsed)
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        const user = await getUser(email);

        console.log("🚀************ ~ user:", user)
        if (!user) return null;
        
      //  const match = await bcrypt.compare(

      //     password,
      //     user.password
          
      //   );
      //   console.log("🚀 ~ match:", match)
 
        return user;

        return null;
      },
    }),
  ],
});
