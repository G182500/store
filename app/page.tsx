import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/table";

export default function Home() {
  return (
    <main className="card w-full">
      <div className="rounded-md border">
        <Table className="">
          <TableBody>
            <TableRow>
              <TableCell>Teste</TableCell>
              <TableCell>Teste2</TableCell>
              <TableCell>Teste3</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
