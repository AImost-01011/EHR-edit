import dbConnect from "../../../../utils/dbConnect";
import Patient from "../../../../models/patientModel";
import { NextApiRequest, NextApiResponse } from "next";
import { regCommand } from "../../../../models/regCommand";
import { FilterQuery } from "mongoose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //need params... oriId_m category search
  await dbConnect();

  if (req.method === "POST") {
    try {
      let findCondition: FilterQuery<any> = {};

      switch (req.body.category) {
        case "name":
          findCondition = {
            $or: [
              {
                "patientName.name": new RegExp(req.body.search),
                miId_p: req.body.oriId_m,
              },
              {
                "patientName.hira": new RegExp(req.body.search),
                miId_p: req.body.oriId_m,
              },
            ],
          };
          break;

        case "disease":
          findCondition = {
            "medicalHistory.disease": new RegExp(req.body.search),
            miId_p: req.body.oriId_m,
          };
          break;

        default:
          break;
      }

      if (req.body.search) {
        Patient.find(findCondition, (err, doc) => {
          if (err) res.status(400).send(err);
          res.status(200).send(doc);
        }).select(regCommand);
      } else {
        Patient.find({ miId_p: req.body.oriId_m }, (err, doc) => {
          if (err) res.status(400).send(err);
          res.status(200).send(doc);
        }).select(regCommand);
      }
    } catch (error) {
      res.status(400).send(error);
    }
  }
}
