
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { getUserFromDb } from "@/app/server/services/userService"
export const {handlers,signIn,signOut,auth}=NextAuth({
    pages: {
        signIn: "/login",
      },
      callbacks: {
        async session({ session, token }:any) {
          // Attach additional user data to the session
          session.user.id = token.id;
          session.user.name = token.name;
          session.user.email = token.email;
          return session;
        },
        async jwt({ token, user }) {
          // Add user data to token for session callback
          if (user) {
            token.id = user.id;
            token.name = user.name;
            token.email = user.email;
          }
          return token;
        },
      },
    
     
    providers:[Google, Credentials({
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        credentials: {
          email: {},
          password: {},
        },
        authorize: async (credentials: Partial<Record<"email" | "password", unknown>>) => {
          let user = null;
          

          // logic to salt and hash password
          const pwHash = credentials.password;

          // logic to verify if the user exists
          user = await getUserFromDb(credentials.email as string, pwHash as string);
         
          if (!user) {
            // No user found, so this is their first attempt to login
            // Optionally, this is also the place you could do a user registration
            throw new Error("Invalid credentials.");
            return null;
          }

          // return user object with their profile data
          return {
            id: user.id.toString(), // Convert id to string as expected by User type
            name: user.name,
            email: user.email,
          };
        },

      }),]
})