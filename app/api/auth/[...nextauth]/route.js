// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import { authOptions } from "@/auth"; // Make sure your auth.js exports authOptions

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };