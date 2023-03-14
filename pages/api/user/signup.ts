import { prisma } from "@/lib/server/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function session(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) return res.status(400).end();

  const user = await prisma.user.create({
    data: {
      ...session.user,
      ...req.body,
    },
  });

  return res.json(user);
}
