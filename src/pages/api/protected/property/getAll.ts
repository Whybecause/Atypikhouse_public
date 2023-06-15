// Import Third-party Dependencies
import { NextApiRequest, NextApiResponse } from "next";

// Import Internal Dependencies
import prisma from "../../../../lib/db/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse): Promise<void> {

  if (req.method === "GET") {
    let result;

    try {
      result = await prisma.property.findMany({
        include: {
          images: true,
          equipementType: true,
          propertyType: true,
          historical: {
            select: {
              id: true,
              userId: true,
              propertyId: true,
              property: {
                select: {
                  userId: true
                }
              },
              user: {
                select: {
                  name: true,
                  email: true,
                  image: true,
                  customImage: {
                    select: {
                      uri: true
                    }
                  }
                }
              },
              dateEnd: true,
              dateStart: true,
              price: true,
              vote: true,
              commentary: true,
            }
          },
          vote: true,
          adress: true,
          user: {
            select: {
              mainAdressId: true
            }
          }
        }
      });

      res.status(200).json({ result });
    }
    catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  else {
    res.setHeader("Allow", "GET");
    res.status(405).end("Method Not Allowed");
  }

}
