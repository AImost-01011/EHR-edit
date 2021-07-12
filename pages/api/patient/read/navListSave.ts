import dbConnect from "../../../../utils/dbConnect";
import Patient from "../../../../models/patientModel";
import { NextApiRequest, NextApiResponse } from "next";
import { regCommand } from "../../../../models/regCommand";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //need params... navListSave
  await dbConnect();

  if (req.method === "POST") {
    try {
      Patient.find({ oriId_p: { $in: req.body.navListSave } }, (err, doc) => {
        if (err) res.status(400).send(err);
        res.status(200).send(doc);
      }).select(regCommand);
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
}
