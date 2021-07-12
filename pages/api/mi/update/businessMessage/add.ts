import dbConnect from "../../../../../utils/dbConnect";
import Mi from "../../../../../models/miModel";
import { NextApiRequest, NextApiResponse } from "next";
import { regCommand } from "../../../../../models/regCommand";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //need params... with speaker content oriId_m
  await dbConnect();

  if (req.method === "POST") {
    try {
      const newMessage = {
        with: req.body.with,
        speaker: req.body.speaker,
        content: req.body.content,
        update: Date.now(),
        isRead: false,
      };

      Mi.findOneAndUpdate(
        { oriId_m: req.body.oriId_m },
        {
          //@ts-ignore
          $push: { businessContact: newMessage },
        },
        { new: true },
        (err, doc) => {
          if (err) res.status(400).send(err);

          res.status(200).send(doc);
        }
      ).select(regCommand);
    } catch (error) {
      res.status(200).send(null);
    }
  }
}
