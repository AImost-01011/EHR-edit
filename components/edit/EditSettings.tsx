import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookie from "js-cookie";
import Link from "next/link";
import Cookies from "js-cookie";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import {
  TableContainer,
  TableBody,
  TableRow,
  Table,
  TableCell,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Snackbar,
} from "@material-ui/core";

import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Accordion from "@material-ui/core/Accordion";
import Button from "@material-ui/core/Button";
import { RootState } from "../../redux/store";
import { TextField } from "@material-ui/core";
import { updateMessage } from "../../redux/oneStaffSlice";
import { addBusiness, fetchMi } from "../../redux/oneMiSlice";
import MyTalk from "../reusables/MyTalk";
import YourTalk from "../reusables/YourTalk";

const EditSettings: React.FC = () => {
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [messageSnack, setMessageSnack] = useState(false);
  const [talk, setTalk] = useState<JSX.Element[]>([]);
  const [sendBusiness, setSendBusiness] = useState("");

  const staffSelector = useSelector((state: RootState) => state.oneStaff);
  const miSelector = useSelector((state: RootState) => state.oneMi);
  const dispatch = useDispatch();

  useEffect(() => {
    if (staffSelector.oriId_s) {
      const miId = Cookie.get("miId");

      dispatch(fetchMi({ oriId_m: miId }));

      setMessage(staffSelector.message.content);
    }
  }, [staffSelector.oriId_s]);

  useEffect(() => {
    if (miSelector.oriId_m) {
      const miId = Cookie.get("miId");

      const targetRole = staffSelector.miAffiliation.find(
        (el) => el.oriId_m === miId
      ).role;

      setRole(targetRole.join("、"));
    }
  }, [miSelector.oriId_m]);

  useEffect(() => {
    if (miSelector.oriId_m) {
      const talkData = miSelector.businessContact.filter(
        (el) => el.with === staffSelector.oriId_s
      );

      const sortedTalk = talkData.sort((a, b) => {
        return b.update - a.update;
      });

      setTalk(() => []);

      sortedTalk.map((el, i) => {
        if (el.speaker === staffSelector.oriId_s) {
          setTalk((prevProps) => [
            ...prevProps,
            <MyTalk
              content={el.content}
              update={el.update}
              isRead={el.isRead}
              key={i}
            />,
          ]);
        } else {
          setTalk((prevProps) => [
            ...prevProps,
            <YourTalk
              content={el.content}
              update={el.update}
              isRead={el.isRead}
              key={i}
            />,
          ]);
        }
      });
    }
  }, [miSelector.businessContact]);

  const messageChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (e) => setMessage(e.target.value);

  const messageClick = () => {
    dispatch(
      updateMessage({ oriId_s: staffSelector.oriId_s, content: message })
    );

    setMessageSnack(true);

    setTimeout(() => setMessageSnack(false), 5000);
  };

  const businessChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (e) => {
    setSendBusiness(e.target.value);
  };

  const businessClick = () => {
    dispatch(
      addBusiness({
        with: staffSelector.oriId_s,
        oriId_m: miSelector.oriId_m,
        speaker: staffSelector.oriId_s,
        content: sendBusiness,
      })
    );
  };

  return (
    <Grid xs={10} item>
      <Box
        height="calc(100vh - 48px - 2rem)"
        py="10px"
        px="20px"
        style={{ overflowY: "scroll" }}
      >
        <Typography variant="h5" color="primary">
          EHR Edit の設定
        </Typography>

        <Box py="10px">
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell width="200px" align="right">
                    使用者の名前
                  </TableCell>
                  <TableCell>{staffSelector.staffName.name ?? ""}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell align="right">医療機関</TableCell>
                  <TableCell>{miSelector.miName.name}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell align="right">ワークスペース</TableCell>
                  <TableCell>
                    {staffSelector.workSpace.space
                      ? staffSelector.workSpace.space
                      : "不明"}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell align="right">この医療機関での役割</TableCell>
                  <TableCell>{role}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box py="10px">
          <Accordion defaultExpanded>
            <AccordionSummary>
              <Typography variant="body1" color="initial">
                伝言
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <TextField
                variant="outlined"
                size="small"
                value={message}
                onChange={messageChange}
                multiline
                fullWidth
              />
            </AccordionDetails>

            <AccordionActions>
              <Button color="primary" onClick={messageClick}>
                変更
              </Button>
            </AccordionActions>
          </Accordion>

          <Accordion defaultExpanded>
            <AccordionSummary>
              <Typography variant="body1" color="initial">
                医療機関との連絡 - {miSelector.miName.name}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box display="flex" flexDirection="column" width="100%">
                <Box
                  display="flex"
                  flexDirection="column"
                  maxHeight="300px"
                  overflow="auto"
                  width="100%"
                  px="40px"
                  mb="10px"
                >
                  {talk}
                </Box>

                <FormControl margin="dense" variant="outlined">
                  <InputLabel variant="outlined">連絡</InputLabel>
                  <OutlinedInput
                    id=""
                    label="連絡"
                    value={sendBusiness}
                    onChange={businessChange}
                    fullWidth
                    multiline
                    endAdornment={
                      <InputAdornment position="end">
                        <Button
                          variant="text"
                          color="primary"
                          title="この内容で送信します"
                          onClick={businessClick}
                        >
                          送信
                        </Button>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Box>
            </AccordionDetails>
          </Accordion>

          <Box py="10px" width="100%" display="flex" justifyContent="center">
            <Link href="/api/auth/logout">
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  Cookies.remove("miId");
                  Cookies.remove("space");
                }}
              >
                ログアウトする
              </Button>
            </Link>
          </Box>
        </Box>

        <Snackbar
          open={messageSnack}
          message="伝言を変更しました"
          autoHideDuration={5000}
        />
      </Box>
    </Grid>
  );
};

export default EditSettings;
