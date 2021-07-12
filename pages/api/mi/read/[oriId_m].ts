import dbConnect from "../../../../utils/dbConnect";
import Mi from "../../../../models/miModel";
import { NextApiRequest, NextApiResponse } from "next";
import { regCommand } from "../../../../models/regCommand";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { oriId_m } = req.query;

  if (req.method === "GET") {
    try {
      Mi.findOne({ oriId_m: oriId_m }, (err, doc) => {
        if (err) res.status(400).send(err);

        res.status(200).send(doc);
      }).select(regCommand);
    } catch (error) {
      res.status(200).send(null);
    }
  }
}
