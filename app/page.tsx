import { Card, Title, Text } from '@tremor/react';
import { queryBuilder } from '../lib/planetscale';
import Search from './search';
import UsersTable from './table';

export const dynamic = 'force-dynamic';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? '';
  const logs = await queryBuilder
    .selectFrom('logs')
    .select(['id', 'log_id', 'created_at', 'client_name', 'uid'])
    .where('client_name', 'like', `%${search}%`)
    .execute();

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
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
