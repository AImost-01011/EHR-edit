import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Cookie from "js-cookie";

import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { RootState } from "../../../../redux/store";
import Button from "@material-ui/core/Button";
import { closeCreateDia } from "../../../../redux/supporterSlice";
import { Box, Typography } from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { setNavListSave } from "../../../../redux/oneStaffSlice";

const CreateDialog: React.FC = () => {
  //data
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstHira, setFirstHira] = useState("");
  const [lastHira, setLastHira] = useState("");
  const [birthday, setBirthday] = useState<Date | null>(new Date());
  const [gender, setGender] = useState("");
  const [zip_p, setZip_p] = useState("");
  const [address1_p, setAddress1_p] = useState("");
  const [address2_p, setAddress2_p] = useState("");

  const [isLoading, setIsLoading] = useState("hidden");

  const supportSelector = useSelector((state: RootState) => state.supporter);
  const staffSelector = useSelector((state: RootState) => state.oneStaff);
  const dispatch = useDispatch();

  const backClick = () => {
    if (isLoading === "hidden") dispatch(closeCreateDia());
  };

  const createClick = () => {
    if (firstName && lastName && firstHira && lastHira) {
      setIsLoading("visible");
      const oriId_m = Cookie.get("miId");

      axios
        .post("/api/patient/create", {
          oriId_m: oriId_m,
          oriId_s: staffSelector.oriId_s,
          patientName: `${lastName} ${firstName}`,
          patientHira: `${lastHira} ${firstHira}`,
          gender: gender,
          birthday: birthday.getTime(),
          zip_p: zip_p,
          address1_p: address1_p,
          address2_p: address2_p,
        })
        .then((result) => {
          dispatch(
            setNavListSave({
              oriId_s: staffSelector.oriId_s,
              navListSave: [...staffSelector.navListSave, result.data],
            })
          );
          dispatch(closeCreateDia());
          setIsLoading("hidden");
        })
        .catch((err) => console.log(err));
    } else {
      window.alert("患者の名字・名前、みょうじ・なまえ、生年月日は必須です。");
    }
  };

  const inputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    switch (e.currentTarget.id) {
      case "lastName":
        setLastName(e.target.value);
        break;

      case "firstName":
        setFirstName(e.target.value);
        break;

      case "lastHira":
        setLastHira(e.target.value);
        break;

      case "firstHira":
        setFirstHira(e.target.value);
        break;

      case "zip":
        setZip_p(e.target.value);
        break;

      case "add1":
        setAddress1_p(e.target.value);
        break;

      case "add2":
        setAddress2_p(e.target.value);
        break;

      default:
        break;
    }
  };

  const genderChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => void = (e) => {
    switch (e.target.value) {
      case "male":
        setGender("男性");
        break;

      case "female":
        setGender("女性");
        break;

      default:
        setGender(e.target.value);
        break;
    }
  };

  return (
    <Dialog open={supportSelector.isCreateOpen} fullWidth maxWidth="lg">
      <DialogTitle>患者データの新規作成</DialogTitle>

      <DialogContent>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell align="right">患者の名前</TableCell>
                <TableCell>
                  <Box
                    width="100%"
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-around"
                  >
                    <Box width="40%">
                      <TextField
                        size="small"
                        label="名字"
                        id="lastName"
                        onChange={inputChange}
                        fullWidth
                      />
                    </Box>
                    <Box width="40%">
                      <TextField
                        size="small"
                        label="名前"
                        id="firstName"
                        onChange={inputChange}
                        fullWidth
                      />
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell align="right">かんじゃのなまえ(ひらがな)</TableCell>
                <TableCell>
                  <Box
                    width="100%"
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-around"
                  >
                    <Box width="40%">
                      <TextField
                        size="small"
                        label="みょうじ(ひらがな)"
                        helperText="患者の名字をひらがなで入力してください"
                        id="lastHira"
                        onChange={inputChange}
                        fullWidth
                      />
                    </Box>
                    <Box width="40%">
                      <TextField
                        size="small"
                        label="なまえ(ひらがな)"
                        helperText="患者の名前をひらがなで入力してください"
                        id="firstHira"
                        onChange={inputChange}
                        fullWidth
                      />
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell align="right">生年月日</TableCell>
                <TableCell align="center">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      disableFuture
                      //   disableToolbar
                      size="small"
                      openTo="year"
                      format="yyyy/MM/dd"
                      views={["year", "month", "date"]}
                      maxDate={new Date()}
                      variant="dialog"
                      value={birthday}
                      onChange={setBirthday}
                    />
                  </MuiPickersUtilsProvider>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell align="right">性別</TableCell>
                <TableCell align="center">
                  <FormControl>
                    <RadioGroup onChange={genderChange} row>
                      <FormControlLabel
                        value="male"
                        control={<Radio color="primary" size="small" />}
                        label="男性"
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio color="primary" size="small" />}
                        label="女性"
                      />
                      <FormControlLabel
                        value="other"
                        control={<Radio color="primary" size="small" />}
                        label="
                         その他
                        "
                      />
                    </RadioGroup>
                  </FormControl>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell align="right">現住所など</TableCell>
                <TableCell>
                  <Box
                    width="100%"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <Box width="90%">
                      <TextField
                        fullWidth
                        label="郵便番号"
                        helperText="例）000-0000"
                        size="small"
                        id="zip"
                        onChange={inputChange}
                      />
                    </Box>
                    <Box width="90%">
                      <TextField
                        fullWidth
                        label="都道府県・市区町村・番地"
                        helperText="例）北海道　札幌市　〇〇区　北〇〇条　西〇〇丁目　〇〇-◯"
                        size="small"
                        id="add1"
                        onChange={inputChange}
                      />
                    </Box>
                    <Box width="90%">
                      <TextField
                        fullWidth
                        label="マンション名・部屋番号"
                        helperText="例）〇〇ビル　◯階"
                        size="small"
                        id="add2"
                        onChange={inputChange}
                      />
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
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
            患者データをつくっています
          </Typography>
        </Box>
        <Button color="primary" variant="outlined" onClick={backClick}>
          やめる
        </Button>
        <Button color="primary" variant="contained" onClick={createClick}>
          作成
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateDialog;
