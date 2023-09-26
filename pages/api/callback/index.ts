import type { NextApiRequest, NextApiResponse } from 'next'

import { Generated, Kysely } from 'kysely';
import { PlanetScaleDialect } from 'kysely-planetscale';

interface Log {
    id: Generated<number>;
    log_id: string;
    created_at: string;
    client_name: string;
    uid: string;
}

interface Database {
    logs: Log;
    // https://github.com/nextauthjs/next-auth/issues/4922
}

const queryBuilder = new Kysely<Database>({
    dialect: new PlanetScaleDialect({
        url: process.env.DATABASE_URL
    })
});

// type CallbackModel = {
//     log_id: string
//     created_at: string
//     client_id: string
//     user_id: string
//     uid: string
// }

// pages/api/your-endpoint.js
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        // Handle the POST request here
        const data = req.body; // Access the request body
        console.log("got data")
        console.log(data)
        const log_id = await queryBuilder
            .insertInto('logs')
            .values({
                log_id: data.log_id,
                created_at: data.created_at,
                client_name: data.client_name,
                uid: data.uid,
            })
            .executeTakeFirst()
        console.log(`id: ${log_id}`)
        res.status(200).json({ message: 'POST request handled' });
    } else {
        res.status(405).end(); // Method not allowed
    }
}