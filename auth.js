// // auth.js
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Admin Login",
//       credentials: {
//         username: { label: "Username", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (
//           credentials.username === process.env.ADMIN_USER &&
//           credentials.password === process.env.ADMIN_PASS
//         ) {
//           return {
//             id: "admin",
//             name: "Admin",
//             email: "admin@dwhomecrafts.com",
//           };
//         }
//         return null;
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/admin/login",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.name = user.name;
//         token.email = user.email;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user = {
//         id: token.id,
//         name: token.name,
//         email: token.email,
//       };
//       return session;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };

// export const { handlers, auth } = NextAuth(authOptions);