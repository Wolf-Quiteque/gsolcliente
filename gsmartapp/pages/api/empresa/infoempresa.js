import { ObjectId } from "bson";
import clientPromise from "../../../lib/mongodb";
export default async function handler(req, res) {
  const cliente = await clientPromise;
  const db = cliente.db("myFirstDatabase");
  const data = await db
    .collection("empresas")
    .findOne({ _id: new ObjectId(req.body.id) });
  res.json(data);
}
