import React from "react";
import { useSelector } from "react-redux";
import differenceInYears from "date-fns/differenceInYears";
import { format } from "date-fns";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { RootState } from "../../../../../redux/store";
import Box from "@material-ui/core/Box";

type patientListProps = {
  addClick: React.MouseEventHandler<HTMLTableRowElement>;
};

const PatientList: React.FC<patientListProps> = ({ addClick }) => {
  const addSelector = useSelector((state: RootState) => state.add);
  const staffSelector = useSelector((state: RootState) => state.oneStaff);

  const addList = addSelector.patient.map((el, i) => {
    if (staffSelector.navListSave.includes(el.oriId_p)) {
      return;
    } else {
      const diseaseList = el.medicalHistory.map((el) => el.disease);
      const diseases = diseaseList.join("、");

      const updates = el.medicalRecord.map((el) => el.latestUpdate);
      const latestUpdate = Math.max(...updates);

      return (
        <TableRow hover onClick={addClick} key={i} id={`${el.oriId_p}@addlist`}>
          <TableCell align="right">{el.patientName.name}</TableCell>
          <TableCell>{el.gender}</TableCell>
          <TableCell>
            {differenceInYears(new Date(), new Date(el.birthday)) + "歳"}
          </TableCell>
          <TableCell>{diseases ? diseases : "なし"}</TableCell>
          <TableCell>
            {isFinite(latestUpdate)
              ? format(new Date(latestUpdate), "yyyy年MM月dd日")
              : "なし"}
          </TableCell>
        </TableRow>
      );
    }
  });

  return (
    <Box component={TableContainer} height="600px" overflow="auto">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width="200px" align="right">
              名前
            </TableCell>
            <TableCell width="90px">性別</TableCell>
            <TableCell width="90px">年齢</TableCell>
            <TableCell>既往症</TableCell>
            <TableCell width="140px">最終更新</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>{addList}</TableBody>
      </Table>
    </Box>
  );
};

export default PatientList;
