import dbConnect from "../../../../utils/dbConnect";
import Patient from "../../../../models/patientModel";
import { NextApiRequest, NextApiResponse } from "next";
import { regCommand } from "../../../../models/regCommand";
import { FilterQuery } from "mongoose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //need params... oriId_p
  await dbConnect();

  if (req.method === "POST") {
    try {
      Patient.findOne({ oriId_p: req.body.oriId_p }, (err, doc) => {
        if (err) res.status(400).send(err);

        return res.status(200).send(doc);
      }).select(regCommand);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}
