import { Pool } from "pg";

interface Params {
  id: string;
}

export async function GET(req: Request, { params }: { params: Params }) {
  try {
    const pool = new Pool({
      connectionString: process.env.CONNECTION_STRING,
      //Ex: postgres://user:password@host:port/database
    });
    const client = await pool.connect();

    const productById = await client.query(
      `SELECT * FROM product WHERE _id = '${params.id}'`
    );

    client.release(); //close connection

    return Response.json(
      {
        message: "sucesso ao buscar o produto",
        product: productById.rows[0],
      },
      { status: 200 }
    );
  } catch {
    return Response.json(
      { message: "erro ao buscar o produto" },
      { status: 500 }
    );
  }
}
