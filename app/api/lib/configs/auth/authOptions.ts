import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions :AuthOptions = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || "", 
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        }),
      ],
      callbacks: {
        session: ({ session, token }) => ({
          ...session,
          user: {
            ...session.user,
            id: token.email,
          }
        }),
        async redirect() {
          return `${process.env.NODE_ENV === "production" ? process.env.NEXTAUTH_URL : "http://localhost:3000"}/list`;
        },
      },
      secret: process.env.NEXTAUTH_SECRET,
      
  }