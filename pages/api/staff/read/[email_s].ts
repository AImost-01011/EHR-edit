import dbConnect from "../../../../utils/dbConnect";
import Staff from "../../../../models/staffModel";
import { NextApiRequest, NextApiResponse } from "next";
import { regCommand } from "../../../../models/regCommand";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { email_s } = req.query;

  if (req.method === "GET") {
    try {
      const staff = await Staff.findOne({ email: email_s }).select(regCommand);
      res.status(200).send(staff);
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
}
