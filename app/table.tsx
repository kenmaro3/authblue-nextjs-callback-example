import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text
} from '@tremor/react';

interface Log {
  id: number;
  log_id: string;
  created_at: string;
  client_name: string;
  uid: string;
  user_info: string;
}

export default function UsersTable({ logs }: { logs: Log[] }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>UID</TableHeaderCell>
          <TableHeaderCell>Log ID</TableHeaderCell>
          <TableHeaderCell>Created At</TableHeaderCell>
          <TableHeaderCell>Client Name</TableHeaderCell>
          <TableHeaderCell>User Info</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {logs.map((log) => (
          <TableRow key={log.id}>
            <TableCell>
              <Text>{log.uid}</Text>
            </TableCell>
            <TableCell>
              <Text>{log.log_id}</Text>
            </TableCell>
            <TableCell>
              <Text>{log.created_at}</Text>
            </TableCell>
            <TableCell>
              <Text>{log.client_name}</Text>
            </TableCell>
            <TableCell>
              <Text>{log.user_info}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
