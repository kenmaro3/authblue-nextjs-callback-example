import { Log } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Log[]>,
) {

    // get list
    console.log("/logs")
    const logs = await prisma.log.findMany();
    console.log(logs)
    res.status(200).json(logs);
}