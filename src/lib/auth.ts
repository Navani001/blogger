
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { getUserFromDb } from "@/app/server/services/userService"
export const {handlers,signIn,signOut,auth}=NextAuth({
    pages: {
        signIn: "/login",
      },
  
     
    providers:[Google, Credentials({
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        credentials: {
          email: {},
          password: {},
        },
        authorize: async (credentials) => {
          let user = null
   
          // logic to salt and hash password
          const pwHash = credentials.password
   
          // logic to verify if the user exists
          user = await getUserFromDb(credentials.email, pwHash)
   
          if (!user) {
            // No user found, so this is their first attempt to login
            // Optionally, this is also the place you could do a user registration
            throw new Error("Invalid credentials.")
          }
   
          // return user object with their profile data
          return user
        },
      }),]
})