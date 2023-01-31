import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "bson";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const cliente = await clientPromise;

  const data = req.body;
  const db = cliente.db("myFirstDatabase");
  var resul = await db
    .collection("demostracao")
    .find({ id_empresa: data.id_empresa, ano: data.ano, mes: data.mes })
    .toArray();

  res.json(resul);
}
