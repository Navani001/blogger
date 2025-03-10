
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { getidFromDb, getUserFromDb } from "@/app/server/services/userService"
export const {handlers,signIn,signOut,auth}=NextAuth({
    pages: {
        signIn: "/login",
      },
      
      callbacks: {
        
        async signIn({ user, account, profile }) {
          if (account?.provider === "google") {
              try {
           const data= await getidFromDb(user.email,user.image,user.name)
          
            if(data && user){
              user.id = data.id.toString();
            }
              // return true
            } catch (error) {
              console.error("Error during Google sign in:", error)
              return false
            }
          }
          console.log("user",user)
          return true
        },
        async session({ session, token }:any) {
    
          session.user.id = token.id;
          session.user.name = token.name;
          session.user.email = token.email;
          return session;
        },
        async jwt({ token, user }) {
          if (user) {
            token.id = user.id;
            token.name = user.name;
            token.email = user.email;
          }
          return token;
        },
      },
    
     
    providers:[Google({
         
            authorization:{
                      url: `https://accounts.google.com/o/oauth2/auth/authorize?response_type=code&prompt=login`
            },
                        
}), Credentials({
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