// Import External Dependencies
import { NextApiRequest, NextApiResponse } from "next";

export async function health(req: NextApiRequest, res: NextApiResponse): Promise<void> {

  if (req.method === "GET") {
    const status: "pass" | "fail" | "warn" = "pass";
    const time = new Date().toUTCString();

    const details = {
      uptime: [
        {
          componentType: "process",
          metricValue: process.uptime(),
          metricUnit: "s",
          status: "pass",
          time
        }
      ]
    };

    res.status(200).json({
      status,
      version: "0.1.0",
      description: "E-commerce website",
      details
    });
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).end("Method Not Allowed");
  }
}
