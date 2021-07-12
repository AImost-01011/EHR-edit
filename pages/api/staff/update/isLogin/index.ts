import dbConnect from "../../../../../utils/dbConnect";
import Staff from "../../../../../models/staffModel";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //need params... oriId_s navListSave
  await dbConnect();

  if (req.method === "POST") {
    try {
      Staff.updateOne(
        { oriId_s: req.body.oriId_s },
        { isLogin: true },
        {},
        (err) => {
          if (err) return res.send(err);

          return res.end();
        }
      );
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
}
