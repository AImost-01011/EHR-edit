import dbConnect from "../../../../utils/dbConnect";
import Mi from "../../../../models/miModel";
import { NextApiRequest, NextApiResponse } from "next";
import { regCommand } from "../../../../models/regCommand";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const mi = await Mi.findOne({ "miName.name": req.body.miName }).select(
        regCommand
      );

      return res.send(mi.oriId_m);
    } catch (error) {
      res.status(200).send(null);
    }
  }
}
