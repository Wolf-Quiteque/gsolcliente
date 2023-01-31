import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "bson";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;
  const { id } = data;

  const cliente = await clientPromise;
  const db = cliente.db("myFirstDatabase");
  const resul = await db.collection("mensagem").find({ id: id }).toArray();

  console.log(resul);
  res.json(resul);
}
