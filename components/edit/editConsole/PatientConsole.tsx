import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookie from "js-cookie";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import st from "./patientConsole.module.scss";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControlLabel,
  FormGroup,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Slider from "@material-ui/core/Slider";
import Checkbox from "@material-ui/core/Checkbox";
import { RootState } from "../../../redux/store";
import { nextDay, nowDay } from "../../../utils/handleDateKit";
import { switchId, switchSlider } from "../../../utils/conscious";
import { updateMedicalRecord } from "../../../redux/onePatientSlice";
import { vitalType } from "../../../moduleType";
import { nanValidator } from "../../../utils/nanValidator";

const PatientConsole: React.FC = () => {
  //main contents
  const [subjective, setSubjective] = useState<string | undefined>("");
  const [objective, setObjective] = useState<string | undefined>("");
  const [assessment, setAssessment] = useState<string | undefined>("");
  const [plan, setPlan] = useState<string | undefined>("");

  //vital
  const [vitalData, setVitalData] = useState<vitalType>({
    respiration: 0,
    bodyTemp: 0,
    diastolicBP: 0,
    systolicBP: 0,
    pulse: 0,
    consciousLevel: 0,
    consciousAdd: "",
  });

  const [sliderData, setSliderData] = useState(-1);
  const [sliderDesc, setSliderDesc] = useState("");
  const [addControler, setAddControler] = useState({
    R: false,
    I: false,
    A: false,
  });

  //modules
  const [isVital, setIsVital] = useState<string>("hidden");

  //auto save
  const [inputCounter, setInputCounter] = useState(0);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
  const [isNew, setIsNew] = useState(false);
  const [latestRecord, setLatestRecord] = useState(0);

  const dispatch = useDispatch();
  const patientSelector = useSelector((state: RootState) => state.onePatient);
  const staffSelector = useSelector((state: RootState) => state.oneStaff);
  const supportSelector = useSelector((state: RootState) => state.supporter);

  //Sync input
  useEffect(() => {
    setInputCounter(inputCounter + 1);
    if (inputCounter > 1 && isNew) {
      if (timeoutId) clearInterval(timeoutId);

      setIsNew(false);

      let newTimeoutId = setTimeout(function () {
        console.log("dispatched!");

        const updates = patientSelector.medicalRecord.map(
          (el) => el.latestUpdate
        );
        if (updates.length) {
          setLatestRecord((prevProps) => {
            prevProps = Math.max(...updates);
            return prevProps;
          });
        } else {
          setLatestRecord((prevProps) => (prevProps = -1));
        }

        dispatch(
          updateMedicalRecord({
            oriId_p: patientSelector.oriId_p,
            subjective: subjective,
            objective: objective,
            assessment: assessment,
            plan: plan,
            respiration: nanValidator(vitalData.respiration),
            bodyTemp: nanValidator(vitalData.bodyTemp),
            systolicBP: nanValidator(vitalData.systolicBP),
            diastolicBP: nanValidator(vitalData.diastolicBP),
            pulse: nanValidator(vitalData.pulse),
            consciousLevel: nanValidator(vitalData.consciousLevel),
            consciousAdd: vitalData.consciousAdd,
            latestRecord: latestRecord,
            oriId_s: staffSelector.oriId_s,
            oriId_m: Cookie.get("miId"),
          })
        );
      }, 3000);

      setTimeoutId(newTimeoutId);
    }
  }, [subjective, objective, assessment, plan, vitalData]);

  //first input injection
  useEffect(() => {
    if (patientSelector.oriId_p) {
      const updates = patientSelector.medicalRecord.map(
        (el) => el.latestUpdate
      );

      if (updates.length) {
        const latest = Math.max(...updates);
        setLatestRecord(() => latest);

        const targetRecord = patientSelector.medicalRecord.find(
          (el) => el.latestUpdate === latest
        );

        if (
          latest &&
          targetRecord.latestUpdate <= nextDay() &&
          targetRecord.latestUpdate >= nowDay()
        ) {
          setSubjective(targetRecord.subjective);
          setObjective(targetRecord.objective);
          setAssessment(targetRecord.assessment);
          setPlan(targetRecord.plan);

          //vital
          setVitalData({
            respiration: targetRecord.respiration,
            bodyTemp: targetRecord.bodyTemp,
            systolicBP: targetRecord.systolicBP,
            diastolicBP: targetRecord.diastolicBP,
            pulse: targetRecord.pulse,
            consciousLevel: targetRecord.consciousLevel,
            consciousAdd: targetRecord.consciousAdd,
          });
        } else {
          setSubjective("");
          setObjective("");
          setAssessment("");
          setPlan("");

          //vital
          setVitalData({
            respiration: undefined,
            bodyTemp: undefined,
            systolicBP: undefined,
            diastolicBP: undefined,
            pulse: undefined,
            consciousLevel: undefined,
            consciousAdd: undefined,
          });
        }
      } else {
        setSubjective("");
        setObjective("");
        setAssessment("");
        setPlan("");

        //vital
        setVitalData({
          respiration: undefined,
          bodyTemp: undefined,
          systolicBP: undefined,
          diastolicBP: undefined,
          pulse: undefined,
          consciousLevel: undefined,
          consciousAdd: undefined,
        });

        setLatestRecord(() => -1);
      }
    }
  }, [patientSelector.oriId_p]);

  useEffect(() => {
    const openCards = supportSelector.openCards;

    if (openCards.includes("vitalData")) setIsVital("block");
    else setIsVital("none");
  }, [supportSelector.openCards]);

  const mainInputChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (e) => {
    switch (e.currentTarget.id) {
      case "subjective":
        setSubjective(e.target.value);
        break;

      case "objective":
        setObjective(e.target.value);
        break;

      case "assessment":
        setAssessment(e.target.value);
        break;

      case "plan":
        setPlan(e.target.value);
        break;

      default:
        break;
    }

    setIsNew(true);
  };

  const vitalChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (e) => {
    setVitalData({
      ...vitalData,
      [e.currentTarget.id]: e.target.value,
    });

    setIsNew(true);
  };

  const sliderChange: (e: React.ChangeEvent<{}>, value: number) => void = (
    e,
    value
  ) => {
    const id: number = switchId(value.toString());
    let level: number = -1;
    if (id > -1) level = id;

    setSliderData(value);
    setVitalData({ ...vitalData, consciousLevel: level });
    setSliderDesc(switchSlider(value.toString()));
    setIsNew(true);
  };

  const addClick = (e) => {
    let newControler = addControler;
    newControler[e.target.value] = !addControler[e.target.value];
    setAddControler({ ...newControler });

    let addData = "";

    if (newControler.R) addData = `${addData}R`;
    if (newControler.I) addData = `${addData}I`;
    if (newControler.A) addData = `${addData}A`;

    setVitalData({ ...vitalData, consciousAdd: addData });
    setIsNew(true);
  };

  return (
    <div className={st.patientConsole}>
      <Typography variant="h5" color="primary">
        患者の情報
      </Typography>

      <Accordion component={Paper} defaultExpanded>
        <AccordionSummary>
          <Typography variant="body1" color="initial">
            患者の主訴 - Subjective
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            variant="outlined"
            size="small"
            id="subjective"
            value={subjective}
            onChange={mainInputChange}
            multiline
            fullWidth
          />
        </AccordionDetails>
      </Accordion>

      <Accordion component={Paper} defaultExpanded>
        <AccordionSummary>
          <Typography variant="body1" color="initial">
            診察の所見 - Objective
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            variant="outlined"
            size="small"
            id="objective"
            value={objective}
            onChange={mainInputChange}
            multiline
            fullWidth
          />
        </AccordionDetails>
      </Accordion>

      <Accordion component={Paper} defaultExpanded>
        <AccordionSummary>
          <Typography variant="body1" color="initial">
            推察 - Assessment
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            variant="outlined"
            size="small"
            id="assessment"
            value={assessment}
            onChange={mainInputChange}
            multiline
            fullWidth
          />
        </AccordionDetails>
      </Accordion>

      <Accordion component={Paper} defaultExpanded>
        <AccordionSummary>
          <Typography variant="body1" color="initial">
            診療計画 - Plan
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            variant="outlined"
            size="small"
            id="plan"
            value={plan}
            onChange={mainInputChange}
            multiline
            fullWidth
          />
        </AccordionDetails>
      </Accordion>

      <Accordion
        component={Paper}
        defaultExpanded
        TransitionProps={{ unmountOnExit: true }}
        style={{ display: isVital }}
      >
        <AccordionSummary>
          <Typography variant="body1" color="initial">
            バイタルデータ
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <Box
              width="100%"
              height="150px"
              display="flex"
              flexDirection="row"
              flexWrap="wrap"
              justifyContent="space-around"
              alignContent="space-around"
              borderBottom={1}
              borderColor="grey.300"
            >
              <Box component={Paper} px="16px" py="8px" width="250px">
                <TextField
                  label="呼吸"
                  size="small"
                  value={
                    vitalData.respiration
                      ? vitalData.respiration.toString()
                      : ""
                  }
                  onChange={vitalChange}
                  id="respiration"
                  fullWidth
                />
              </Box>
              <Box component={Paper} px="16px" py="8px" width="250px">
                <TextField
                  label="体温"
                  size="small"
                  value={
                    vitalData.bodyTemp ? vitalData.bodyTemp.toString() : ""
                  }
                  onChange={vitalChange}
                  id="bodyTemp"
                  fullWidth
                />
              </Box>
              <Box component={Paper} px="16px" py="8px" width="250px">
                <TextField
                  label="拡張期血圧"
                  size="small"
                  value={
                    vitalData.diastolicBP
                      ? vitalData.diastolicBP.toString()
                      : ""
                  }
                  onChange={vitalChange}
                  id="diastolicBP"
                  fullWidth
                />
              </Box>
              <Box component={Paper} px="16px" py="8px" width="250px">
                <TextField
                  label="収縮期血圧"
                  size="small"
                  value={
                    vitalData.systolicBP ? vitalData.systolicBP.toString() : ""
                  }
                  onChange={vitalChange}
                  id="systolicBP"
                  fullWidth
                />
              </Box>
              <Box component={Paper} px="16px" py="8px" width="250px">
                <TextField
                  label="脈拍"
                  size="small"
                  value={vitalData.pulse ? vitalData.pulse.toString() : ""}
                  onChange={vitalChange}
                  id="pulse"
                  fullWidth
                />
              </Box>
            </Box>

            <Box py="10px">
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                pr="20px"
                alignItems="center"
              >
                <Typography variant="body1" color="initial">
                  意識レベル(ジャパン・コーマ・スケール)
                </Typography>

                <Typography variant="h6" color="primary">
                  {vitalData.consciousLevel}-{vitalData.consciousAdd}
                </Typography>
              </Box>

              <Box px="16px" py="20px">
                <Slider
                  defaultValue={-1}
                  min={-1}
                  max={9}
                  step={1}
                  value={sliderData}
                  onChange={sliderChange}
                  marks
                />
              </Box>

              <Box
                px="20px"
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        size="small"
                        value="R"
                        checked={addControler.R}
                        onClick={addClick}
                      />
                    }
                    label="不穏"
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        size="small"
                        value="I"
                        checked={addControler.I}
                        onClick={addClick}
                      />
                    }
                    label="糞尿失禁"
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        size="small"
                        value="A"
                        checked={addControler.A}
                        onClick={addClick}
                      />
                    }
                    label="自発性喪失"
                  />
                </FormGroup>

                <Typography variant="body2" color="initial">
                  {sliderDesc}
                </Typography>
              </Box>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default PatientConsole;
