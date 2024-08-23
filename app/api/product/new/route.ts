import { generateId } from "@/utils/generate-id";
import { Pool } from "pg";

export async function POST(req: Request) {
  const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING,
    //Example: postgres://user:password@host:port/database
  });
  const client = await pool.connect();

  const product = await req.json();
  product._id = generateId();
  product.price = Number(product.price);

  const insertProduct = await client.query(
    `INSERT INTO product (_id, images_url, title, description, price, category, quantity) VALUES ('${product._id}', '${product.images_url}', '${product.title}', '${product.description}', ${product.price}, '${product.category}', ${product.quantity})`
  );

  client.release();

  if (!insertProduct.rowCount)
    return Response.json(
      { status: "error", message: "Erro ao criar o produto, tente novamente" },
      { status: 500 }
    );

  return Response.json(
    { status: "success", message: "Produto criado com sucesso" },
    { status: 200 }
  );
}
