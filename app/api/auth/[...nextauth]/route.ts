import NextAuth from "next-auth"

import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({  
	providers: [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID || "", 
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
	  }),
	],
  callbacks: {
    async redirect() {
      return `${process.env.NODE_ENV === "production" ? process.env.NEXTAUTH_URL : "http://localhost:3000"}/list`;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  
});

export { handler as GET, handler as POST }