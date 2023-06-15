// Import Third-party Dependencies
import prisma from "../../lib/db/prisma";
import { Session } from "next-auth";

export default async function roleMiddleware (session: Session): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email
    },
    rejectOnNotFound: false
  });


  return user !== null && (user.role === "ADMIN" || user.role === "MODERATEUR") ? true : false;
}
