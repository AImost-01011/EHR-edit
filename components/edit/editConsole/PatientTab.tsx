import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";

import Button from "@material-ui/core/Button";

import st from "./patientTab.module.scss";
import ShortList from "../../reusables/ShortList";
import LongList from "../../reusables/LongList";
import { RootState } from "../../../redux/store";
import {
  allergyArr,
  medicalHistoryArr,
  regularMedicineArr,
  smokeArr,
} from "../../../utils/toArray";

const PatientTab: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [tabContent, setTabContent] = useState<JSX.Element>();
  const [tabStyle, setTabStyle] = useState(st.patientTab);

  const staffSelector = useSelector((state: RootState) => state.oneStaff);
  const patientSelector = useSelector((state: RootState) => state.onePatient);
  const dispatch = useDispatch();

  const tabOpenClick = () => {
    setTabStyle(st.patientTabActive);
    setIsActive(true);
  };

  const blurClick = () => {
    setIsActive(false);
    setTabStyle(st.patientTab);
  };

  useEffect(() => {
    if (isActive) {
      setTabContent(
        <>
          <div className={st.leftSide}>
            <ShortList
              title="名前"
              content={patientSelector.patientName.name ?? "なし"}
            />
            <ShortList
              title="性別"
              content={patientSelector.gender ?? "なし"}
            />
            <ShortList
              title="生年月日"
              content={
                format(new Date(patientSelector.birthday), "yyyy年MM月dd日") ??
                "なし"
              }
            />
            <ShortList
              title="住所"
              content={
                patientSelector.location.address1_p
                  ? `${patientSelector.location.address1_p} ${patientSelector.location.address2_p}`
                  : "なし"
              }
            />
            <ShortList
              title="連絡先"
              content={patientSelector.contact.phone_p ?? "なし"}
            />
            <ShortList
              title="緊急連絡先"
              content={patientSelector.contact.emergency_p ?? "なし"}
            />
          </div>
          <div className={st.rightSide}>
            <LongList
              headTitle="使用薬剤"
              bodyTitle={["処方日", "調剤日", "薬剤", "錠数"]}
              bodyContent={regularMedicineArr(patientSelector.medicineNote)}
            />
            <LongList
              headTitle="既往歴"
              bodyTitle={["疾病", "罹患時期", "備考"]}
              bodyContent={medicalHistoryArr(patientSelector.medicalHistory)}
            />
            <LongList
              headTitle="アレルギー"
              bodyTitle={["アレルゲン", "備考"]}
              bodyContent={allergyArr(patientSelector.allergy)}
            />

            <LongList
              headTitle="喫煙"
              bodyTitle={["喫煙開始時期", "1日あたりの本数", "備考"]}
              bodyContent={smokeArr(patientSelector.smoke)}
            />
          </div>
        </>
      );
    } else {
      setTabContent(
        <>
          <span>患者名：{patientSelector.patientName.name}</span>
          <span>性別：{patientSelector.gender}</span>
          <span>
            生年月日：
            {format(new Date(patientSelector.birthday), "yyyy年MM月dd日")}
          </span>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            onClick={toDataClick}
          >
            To Data
          </Button>
        </>
      );
    }
  }, [isActive, patientSelector.oriId_p]);

  const toDataClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    window.alert(
      "未実装です。　この患者のデータをデータベースに移動し研究に使えるようにします。"
    );
  };

  return (
    <div
      className={tabStyle}
      onClick={tabOpenClick}
      onBlur={blurClick}
      tabIndex={0}
    >
      {tabContent}
    </div>
  );
};

export default PatientTab;
