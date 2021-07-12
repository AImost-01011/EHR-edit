import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookie from "js-cookie";

import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";

import { RootState } from "../../../../redux/store";
import { closeAddDia } from "../../../../redux/supporterSlice";
import PatientSearchbar from "./addDialog/PatientSearchbar";
import PatientList from "./addDialog/PatientList";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { fetchAddList } from "../../../../redux/addSlice";
import { setNavListSave } from "../../../../redux/oneStaffSlice";

const AddDialog: React.FC = () => {
  const [isLoading, setIsLoading] = useState("hidden");
  const [isSent, setIsSent] = useState(false);

  const supporterSelector = useSelector((state: RootState) => state.supporter);
  const staffSelector = useSelector((state: RootState) => state.oneStaff);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAddList({ miId: Cookie.get("miId") }));
  }, []);

  useEffect(() => {
    if (isSent) {
      if (staffSelector.loading) {
        setIsLoading("visible");
      } else {
        dispatch(closeAddDia());
        setIsLoading("hidden");
      }
    }
  }, [staffSelector.loading]);

  const backClick = () => {
    dispatch(closeAddDia());
  };

  const addClick: React.MouseEventHandler<HTMLTableRowElement> = (e) => {
    setIsLoading("visible");

    const formedId = e.currentTarget.id.split("@")[0];

    dispatch(
      setNavListSave({
        oriId_s: staffSelector.oriId_s,
        navListSave: [...staffSelector.navListSave, formedId],
      })
    );

    setIsSent(true);
    // setTimeout(() => {
    //   dispatch(closeAddDia());
    //   setIsLoading("hidden");
    // }, 5000);
  };

  return (
    <Dialog open={supporterSelector.isAddOpen} fullWidth maxWidth="lg">
      <DialogTitle>患者一覧に追加</DialogTitle>
      <DialogContent>
        <PatientSearchbar />
        <PatientList addClick={addClick} />
      </DialogContent>
      <DialogActions>
        <Box
          width="260px"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          mx="10px"
          visibility={isLoading}
        >
          <CircularProgress size={30} />
          <Typography variant="body1" color="primary">
            患者データを追加しています
          </Typography>
        </Box>

        <Button variant="outlined" color="primary" onClick={backClick}>
          やめる
        </Button>
        {/* <Button variant="contained" color="primary" onClick={addClick}>
          追加
        </Button> */}
      </DialogActions>
    </Dialog>
  );
};

export default AddDialog;
