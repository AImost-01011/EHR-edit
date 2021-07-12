export interface supportType {
  isCreateOpen: boolean;
  isAddOpen: boolean;
  openCards: string[];
}

export interface oneStaffDataType {
  message: {
    content: string;
    update: number;
  };
  miAffiliation: {
    role: string[];
    oriId_m: string;
  }[];
  navListSave: string[];
  oriId_s: string;
  lastLogin: number;
  isLogin: boolean;
  staffName: {
    name: string;
    hira: string;
  };
  workSpace: {
    mi: string;
    space: string;
  };
  email: string;
}

export interface oneStaffType extends oneStaffDataType {
  loading: boolean;
  error: boolean;
  errorMessage: string;
}

export interface onePatientDataType {
  email: string;
  oriId_p: string;
  patientName: {
    name: string;
    hira: string;
  };
  miId_p: string[];
  latestStaff: string[];
  birthday: number;
  gender: string;

  medicineNote: {
    dispenseDay: number;
    prescriptionDay: number;
    oriId_s: string;
    medicine: [
      { name: string; number: number; term: number; doseTiming: string }
    ];
    oriId_d: string;
  }[];
  smoke: {
    isSmoke: boolean;
    startSmoke: number;
    smokePerDay: number;
    smokeComment: string;
  };
  location: {
    zip_p: string;
    address1_p: string;
    address2_p: string;
  };
  contact: {
    phone_p: string;
    emergency_p: string;
  };
  allergy: {
    allergen: string;
    allergyComment: string;
  }[];
  medicalHistory: {
    disease: string;
    diseaseComment: string;
    period: number;
  }[];
  medicalRecord: {
    writer: string;
    mi: string;
    latestUpdate: number;
    createUpdate: number;
    subjective: string;
    objective: string;
    assessment: string;
    plan: string;
    //   objectiveImg:[String],
    respiration: number;
    bodyTemp: number;
    systolicBP: number;
    diastolicBP: number;
    pulse: number;
    consciousLevel: number;
    consciousAdd: string;
  }[];
}

export interface onePatientType extends onePatientDataType {
  loading: boolean;
  error: boolean;
  errorMessage: string;
}

export type patientType = {
  loading: boolean;
  error: boolean;
  errorMessage: string;
  patient: onePatientDataType[];
};

export interface oneMiDataType {
  miName: {
    name: string;
    hira: string;
  };
  oriId_m: string;
  email: string;
  location: {
    zip_m: string;
    address1_m: string;
    address2_m: string;
  };
  contact: {
    phone_m: string;
    fax_m: string;
    contactEmail: string;
  };
  businessContact: {
    with: string;
    speaker: string;
    content: string;
    update: number;
    isRead: boolean;
  }[];
  notice_m: {
    title: string;
    update: number;
    content: string;
  }[];
}

export interface oneMiType extends oneMiDataType {
  loading: boolean;
  error: boolean;
  errorMessage: string;
}
