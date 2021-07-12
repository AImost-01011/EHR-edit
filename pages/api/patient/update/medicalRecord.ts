import dbConnect from "../../../../utils/dbConnect";
import Patient from "../../../../models/patientModel";
import { NextApiRequest, NextApiResponse } from "next";
import { regCommand } from "../../../../models/regCommand";
import { nanoid } from "nanoid";
import { nextDay, nowDay } from "../../../../utils/handleDateKit";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "POST") {
    //need params... oriId_p subjective objective assessment plan respiration bodyTemp systolicBP diastolicBP pulse consciousLevel consciousAdd latestRecord oriId_s oriId_m
    try {
      const latestRecord = req.body.latestRecord;

      console.log(latestRecord, nextDay(), nowDay());

      if (latestRecord <= nextDay() && latestRecord >= nowDay()) {
        Patient.findOneAndUpdate(
          {
            oriId_p: req.body.oriId_p,
            "medicalRecord.latestUpdate": latestRecord,
          },
          {
            $set: {
              "medicalRecord.$.subjective": req.body.subjective,
              "medicalRecord.$.objective": req.body.objective,
              "medicalRecord.$.assessment": req.body.assessment,
              "medicalRecord.$.plan": req.body.plan,
              "medicalRecord.$.latestUpdate": Date.now(),

              //vital
              "medicalRecord.$.respiration": req.body.respiration,
              "medicalRecord.$.bodyTemp": req.body.bodyTemp,
              "medicalRecord.$.systolicBP": req.body.systolicBP,
              "medicalRecord.$.diastolicBP": req.body.diastolicBP,
              "medicalRecord.$.pulse": req.body.pulse,
              "medicalRecord.$.consciousLevel": req.body.consciousLevel,
              "medicalRecord.$.consciousAdd": req.body.consciousAdd,

              "medicalRecord.$.writer": req.body.oriId_s,
              "medicalRecord.$.mi": req.body.oriId_m,
            },
          },
          { new: true },
          (err, doc) => {
            if (err) return res.status(400).send(err);

            if (doc) return res.status(200).send(doc);
            else return res.status(404).send(doc);
          }
        );
      } else {
        const newRecord = {
          createUpdate: nowDay(),
          subjective: req.body.subjective,
          objective: req.body.objective,
          assessment: req.body.assessment,
          plan: req.body.plan,

          //vital
          respiration: req.body.respiration,
          bodyTemp: req.body.bodyTemp,
          systolicBP: req.body.systolicBP,
          diastolicBP: req.body.diastolicBP,
          pulse: req.body.pulse,
          consciousLevel: req.body.consciousLevel,
          consciousAdd: req.body.consciousAdd,

          latestUpdate: Date.now(),
          writer: req.body.oriId_s,
          mi: req.body.oriId_m,
        };

        Patient.findOneAndUpdate(
          { oriId_p: req.body.oriId_p },
          {
            //@ts-ignore
            $push: { medicalRecord: newRecord },
          },
          { new: true },
          (err, doc) => {
            if (err) return res.status(400).send(err);

            if (doc) return res.status(200).send(doc);
            else return res.status(404).send(doc);
          }
        );
      }
    } catch (error) {
      res.status(400).send(error);
    }
  }
}
