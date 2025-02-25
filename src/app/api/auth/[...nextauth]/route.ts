import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Invalid credentials");
        }

        const response = await fetch("http://localhost:8000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        const data = await response.json();

        if (!response.ok || !data.token) {
          throw new Error(data.message || "Authentication failed");
        }

        // Retourner un objet utilisateur structuré
        return {
          id: data.user, // ou une autre propriété unique qui identifie l'utilisateur
          name: data.user,
          token: data.token,
          message: data.message,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }: any) {
      if (user) {
      
        token.name = user.name;
        token.accessToken = user.token;
        token.message = user.message;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.name = {
        name: token.name,
      };

      session.accessToken = token.accessToken;
      return session;
    },
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
