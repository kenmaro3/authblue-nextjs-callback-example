import type { NextApiRequest, NextApiResponse } from 'next'

import { Generated, Kysely } from 'kysely';
import { PlanetScaleDialect } from 'kysely-planetscale';


interface Log {
    id: Generated<number>;
    log_id: string;
    created_at: string;
    client_name: string;
    uid: string;
    user_info: string;
}

interface Database {
    Log: Log; // This key "Log" should be equal to table name
    // https://github.com/nextauthjs/next-auth/issues/4922
}

const queryBuilder = new Kysely<Database>({
    dialect: new PlanetScaleDialect({
        url: process.env.DATABASE_URL
    })
});


// pages/api/your-endpoint.js
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        // Handle the POST request here
        const data = req.body; // Access the request body
        console.log("got data")
        console.log(data)
        const log_id = await queryBuilder
            .insertInto('Log')
            .values({
                log_id: data.log_id,
                created_at: data.created_at,
                client_name: data.client_name,
                uid: data.uid,
                user_info: data.user_info
            })
            .executeTakeFirst()

        const Pusher = require("pusher")

        const pusher = new Pusher({
            appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID,
            key: process.env.NEXT_PUBLIC_PUSHER_KEY,
            secret: process.env.NEXT_PUBLIC_PUSHER_SECRET,
            cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
            useTLS: false
        });

        pusher.trigger(
            process.env.NEXT_PUBLIC_PUSHER_CHANNEL_NAME,
            process.env.NEXT_PUBLIC_PUSHER_EVENT_NAME,
            {
                message: "hello world"
            })

        console.log(`id: ${log_id}`)
        res.status(200).json({ message: 'POST request handled' });
    } else {
        res.status(405).end(); // Method not allowed
    }
}