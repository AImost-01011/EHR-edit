import dbConnect from "../../../../utils/dbConnect";
import Patient from "../../../../models/patientModel";
import { NextApiRequest, NextApiResponse } from "next";
import { regCommand } from "../../../../models/regCommand";
import { nanoid } from "nanoid";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "POST") {
    //need params... oriId_p gender zip_p address1_p address2_p patientName patientHira oriId_s birthday
    try {
      Patient.findOne(
        {
          "patientName.name": req.body.patientName,
          "patientName.hira": req.body.patientHira,
          birthday: req.body.birthday,
        },
        (err, doc) => {
          if (err) return res.status(400).send(err);

          if (doc) {
            Patient.findOneAndUpdate(
              { oriId_p: doc.oriId_p },
              {
                $addToSet: {
                  //@ts-ignore
                  miId_p: req.body.oriId_m,
                },
                gender: req.body.gender,
                location: {
                  zip_p: req.body.zip_p,
                  address1_p: req.body.address1_p,
                  address2_p: req.body.address2_p,
                },
              },
              { new: true },
              (err, doc) => {
                if (err) return res.status(400).send(err);

                return res.status(200).send(doc);
              }
            );
          } else {
            const id = nanoid();

            const newPatient = {
              oriId_p: id,
              patientName: {
                name: req.body.patientName,
                hira: req.body.patientHira,
              },
              miId_p: [req.body.oriId_m],
              latestStaff: [req.body.oriId_s],
              birthday: req.body.birthday,
              gender: req.body.gender,
              medicineNote: [],
              smoke: {
                isSmoke: false,
                startSmoke: 0,
                smokePerDay: 0,
                smokeComment: "",
              },
              location: {
                zip_p: req.body.zip_p,
                address1_p: req.body.address1_p,
                address2_p: req.body.address2_p,
              },
              contact: {
                phone_p: "",
                emergency_p: "",
              },
              allergy: [],
              medicalRecord: [],
              reservation_p: [],
            };

            const instance = new Patient(newPatient);

            instance.save((err1) => {
              if (err1) res.status(400).send(err1);
              else return res.status(200).send(id);
            });
          }
        }
      );
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
}
