import dbConnect from "../../../../../utils/dbConnect";
import Staff from "../../../../../models/staffModel";
import { NextApiRequest, NextApiResponse } from "next";
import { regCommand } from "../../../../../models/regCommand";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //need params... oriId_s content
  await dbConnect();

  if (req.method === "POST") {
    try {
      Staff.findOneAndUpdate(
        { oriId_s: req.body.oriId_s },
        {
          message: {
            content: req.body.content,
            update: Date.now(),
          },
        },
        { new: true },
        (err, doc) => {
          if (err) res.status(400).send(err);

          if (doc) res.status(200).send(doc);
          else res.status(404).send("update message faild");
        }
      ).select(regCommand);
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
}
