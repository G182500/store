import { generateId } from "@/utils/generate-id";
import { hash } from "@/utils/hash";
import { Pool } from "pg";

export async function POST(req: Request) {
  const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING,
    //Example: postgres://user:password@host:port/database
  });
  const client = await pool.connect();

  const account = await req.json();
  account._id = generateId();
  //account.password = await hash(account.password);

  const insertAccount = await client.query(
    `INSERT INTO account (_id, email, _password, first_name, last_name) VALUES ('${account._id}', '${account.email}', '${account.password}', '${account.first_name}', '${account.last_name}')`
  );

  client.release();

  if (!insertAccount.rowCount)
    return Response.json(
      { status: "error", message: "Erro ao criar o usuário, tente novamente" },
      { status: 500 }
    );

  return Response.json(
    { status: "success", message: "Usuário criado com sucesso" },
    { status: 200 }
  );
}
