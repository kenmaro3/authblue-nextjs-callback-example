import { Card, Title, Text } from '@tremor/react';
import { queryBuilder } from '../lib/planetscale';
import Search from './search';
import UsersTable from './table';
import { getServerSession } from 'next-auth/next';

import Image from "next/image";
// import localImage from "../public/mascot.png";
// import "./test.css"

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

  const session = await getServerSession();
  var logs: Log[] = []
  if (session?.user) {
    logs = await queryBuilder
      .selectFrom('logs')
      .select(['id', 'log_id', 'created_at', 'client_name', 'uid', 'user_info'])
      .where('client_name', 'like', `%${search}%`)
      .execute();
  }

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
