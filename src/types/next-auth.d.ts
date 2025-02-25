import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {name: string};
    accessToken: string;
  }

  interface JWT {
   
    name: string;
    accessToken: string;
  }
}
