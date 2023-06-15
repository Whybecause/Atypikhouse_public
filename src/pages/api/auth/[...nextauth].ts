// Import Third-party Dependencies
import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import bcrypt from "bcrypt";

// Import Internal Dependencies
import prisma from "../../../lib/db/prisma";

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "..@example.com" },
        password: { label: "password", type: "password" }
      },

      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (user) {
          const checkPassword = await bcrypt.compare(credentials.password, user.password);

          if (!checkPassword) {
            return null;
          }

          return user;
        }

        return null;
      }
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    })
  ],

  adapter: Adapters.Prisma.Adapter({ prisma }),

  secret: process.env.SECRET,

  pages: {
    error: "/",
  },

  session: {
    jwt: true,
    maxAge: 24 * 60 * 60
  },

  jwt: {
    secret: process.env.SECRET
  },

  debug: false
};
