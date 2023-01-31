import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const cliente = await clientPromise;
  const db = cliente.db("myFirstDatabase");
  const resul = await db.collection("anuncios").find({}).toArray();
  res.json(resul);
}
