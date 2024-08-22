import { Pool } from "pg";

interface Params {
  name: string;
}

export async function GET(req: Request, { params }: { params: Params }) {
  try {
    const pool = new Pool({
      connectionString: process.env.CONNECTION_STRING,
      //Ex: postgres://user:password@host:port/database
    });
    const client = await pool.connect();

    const { name } = params;
    const productsByName = await client.query(
      `SELECT * FROM product WHERE title LIKE '%${name}%' ORDER BY title`
    );

    client.release(); //close connection

    let hasProducts = productsByName.rows.length;

    return Response.json(
      {
        message: hasProducts
          ? "Sucesso ao buscar os produtos"
          : "Nenhum produto encontrado",
        products: hasProducts ? productsByName.rows : [],
      },
      { status: 200 }
    );
  } catch {
    return Response.json(
      { message: "Erro ao buscar os produtos" },
      { status: 500 }
    );
  }
}
