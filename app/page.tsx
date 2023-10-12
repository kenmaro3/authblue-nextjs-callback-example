"use client"
import { useState, useEffect } from 'react'
import { Card, Title, Text } from '@tremor/react';
// import { queryBuilder } from '../lib/planetscale';
import Search from './search';
import UsersTable from './table';
import { getServerSession } from 'next-auth/next';

import Image from "next/image";
// import localImage from "../public/mascot.png";
// import "./test.css"

import Pusher from 'pusher-js';

const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
});


export const dynamic = 'force-dynamic';

interface Log {
  id: number;
  log_id: string;
  created_at: string;
  client_name: string;
  uid: string;
  user_info: string;
}

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? '';

  // const session = await getServerSession();

  const [logs, setLogs] = useState([]);

  const getLogs = () => {
    fetch('/api/logs')
      .then((res) => res.json())
      .then((data) => {
        console.log("data")
        console.log(data)
        setLogs(data)
      })

  }

  useEffect(() => {
    getLogs()
  }, [])

  useEffect(() => {

    const channel = pusher.subscribe(process.env.NEXT_PUBLIC_PUSHER_CHANNEL_NAME!);

    channel.bind(process.env.NEXT_PUBLIC_PUSHER_EVENT_NAME!, data => {
      getLogs()

    });

    // return () => {
    //   pusher.unsubscribe(process.env.NEXT_PUBLIC_PUSHER_CHANNEL_NAME!);
    // };
  }, [logs])
  // var logs: Log[] = []
  // if (session?.user) {
  //   logs = await queryBuilder
  //     .selectFrom('logs')
  //     .select(['id', 'log_id', 'created_at', 'client_name', 'uid', 'user_info'])
  //     .where('client_name', 'like', `%${search}%`)
  //     .execute();
  // }

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      {/* <div className="container"> */}
      {/* <Image height={50} className='moving-image' src={localImage} alt="mascot" /> */}
      {/* </div> */}
      <Title>Logs from AUTHBLUE</Title>
      <Text>
        A list of logs retrieved from a MySQL database (PlanetScale).
      </Text>
      <Search />
      <Card className="mt-6">
        <UsersTable logs={logs} />
      </Card>
    </main>
  );
}
