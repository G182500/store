import { Pool } from "pg";

interface Params {
  category: string;
}

export async function GET(req: Request, { params }: { params: Params }) {
  try {
    const pool = new Pool({
      connectionString: process.env.CONNECTION_STRING,
      //Ex: postgres://user:password@host:port/database
    });
    const client = await pool.connect();

    const { category } = params;
    const productsByCategory = await client.query(
      `SELECT * FROM product WHERE category LIKE '%${category}%' ORDER BY title`
    );

    client.release(); //close connection

    let hasProducts = productsByCategory.rows.length;

    return Response.json(
      {
        message: hasProducts
          ? "Sucesso ao buscar os produtos"
          : "Nenhum produto encontrado",
        products: hasProducts ? productsByCategory.rows : [],
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
