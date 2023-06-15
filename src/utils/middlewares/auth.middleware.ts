// Import Third-party Dependencies
import { NextApiRequest } from "next";
import { getSession } from "next-auth/client";
import { Session } from "next-auth";

export default async function authMiddleware (req: NextApiRequest): Promise<Session | false> {
  const session = await getSession({ req });

  return session ? session : false;
}
