import { format } from "date-fns";

type medNoteType = {
  dispenseDay: number;
  prescriptionDay: number;
  oriId_s: string;
  medicine: {
    name: string;
    number: number;
    term: number;
    doseTiming: string;
  }[];
  oriId_d: string;
}[];

type medHisType = {
  disease: string;
  diseaseComment: string;
  period: number;
}[];

type allergyType = {
  allergen: string;
  allergyComment: string;
}[];

type smokeType = {
  isSmoke: boolean;
  startSmoke: number | null;
  smokePerDay: number | null;
  smokeComment: string;
};

export const regularMedicineArr = (el: medNoteType) => {
  if (el.length) {
    let medicineArr: string[] = [];
    for (let i = 0; i < el.length; i++) {
      const nowEl = el[i];
      if (nowEl.prescriptionDay)
        medicineArr.push(
          format(new Date(nowEl.prescriptionDay), "yyyy年MM月dd日")
        );
      else medicineArr.push("");

      if (nowEl.dispenseDay)
        medicineArr.push(format(new Date(nowEl.dispenseDay), "yyyy年MM月dd日"));
      else medicineArr.push("");

      if (nowEl.medicine) {
        for (let j = 0; j < nowEl.medicine.length; j++) {
          const nowMed = nowEl.medicine[j];
          if (nowMed.name) medicineArr.push(nowMed.name);
          else medicineArr.push("");

          if (nowMed.number) medicineArr.push(nowMed.number.toString());
          else medicineArr.push("");
        }
      }
    }

    return medicineArr;
  } else return [];
};

export const medicalHistoryArr = (el: medHisType) => {
  if (el.length) {
    let historyArr: string[] = [];
    for (let i = 0; i < el.length; i++) {
      const nowEl = el[i];
      if (nowEl.disease) historyArr.push(nowEl.disease);
      else historyArr.push("");
      if (nowEl.period)
        historyArr.push(format(new Date(nowEl.period), "yyyy年MM月dd日"));
      else historyArr.push("");
      if (nowEl.diseaseComment) historyArr.push(nowEl.diseaseComment);
      else historyArr.push("");
    }

    return historyArr;
  } else return [];
};

export const allergyArr = (el: allergyType) => {
  if (el.length) {
    let allergy: string[] = [];
    for (let i = 0; i < el.length; i++) {
      const nowEl = el[i];
      if (nowEl.allergen) allergy.push(nowEl.allergen);
      else allergy.push("");
      if (nowEl.allergyComment) allergy.push(nowEl.allergyComment);
      else allergy.push("");
    }

    return allergy;
  } else return [];
};

export const smokeArr = (el: smokeType) => {
  if (el.isSmoke) {
    let smoke: string[] = [];
    if (el.startSmoke) smoke.push(format(new Date(el.startSmoke), "yyyy年頃"));
    else smoke.push("");
    if (el.smokePerDay) smoke.push(el.smokePerDay.toString());
    else smoke.push("");
    if (el.smokeComment) smoke.push(el.smokeComment);
    else smoke.push("");

    return smoke;
  } else return [];
};
