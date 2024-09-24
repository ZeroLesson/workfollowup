import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`http://localhost:3000/api/users?email=${encodeURIComponent(credentials.username)}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
          });

          if (!res.ok) throw new Error("Failed to fetch users");

          const users = await res.json();

          const user = users.find(user => user.email === credentials.username);

          if (!user) {
            console.error("No matching user found");
            return null;
          }

          if (credentials.password === user.password) {
            return { id: user.ID, email: user.email, role: user.role };
          } else {
            console.error("Password does not match");
            return null;
          }

        } catch (error) {
          console.error("Error during login:", error);
          return null;
        }
      }
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user = { ...session.user, id: token.id };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    }
  },
  pages : {
    signIn : '/auth/signin'
  }
});

export { handler as GET, handler as POST }