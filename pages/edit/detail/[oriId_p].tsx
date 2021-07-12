import React, { useEffect } from "react";
import { getSession } from "@auth0/nextjs-auth0";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import EditAppbar from "../../../components/edit/EditAppbar";
import EditConsole from "../../../components/edit/EditConsole";
import EditFooter from "../../../components/edit/EditFooter";
import EditNav from "../../../components/edit/EditNav";
import EditPalette from "../../../components/edit/EditPalette";

import { onePatientDataType, oneStaffDataType } from "../../../globalType";
import { fetchStaff, serversideData } from "../../../redux/oneStaffSlice";
import { fetchNavList } from "../../../redux/patientSlice";
import { RootState } from "../../../redux/store";
import {
  fetchPatient,
  serversidePatient,
} from "../../../redux/onePatientSlice";

const oriId_p: React.FC<{
  staff: oneStaffDataType;
  patient: onePatientDataType;
}> = ({ staff, patient }) => {
  const dispatch = useDispatch();
  const staffSelector = useSelector((state: RootState) => state.oneStaff);

  useEffect(() => {
    dispatch(serversideData(staff));
    dispatch(serversidePatient(patient));
    dispatch(fetchStaff({ email_s: staff.email }));
    // dispatch(fetchPatient({ oriId_p: patient.oriId_p }));
  }, [staff, patient]);

  useEffect(() => {
    if (staffSelector.oriId_s) {
      dispatch(fetchNavList({ navListSave: staffSelector.navListSave }));
    }
  }, [staffSelector.navListSave.length]);

  return (
    <>
      <Head>
        <title>{`${patient.patientName.name}のカルテ`}</title>
      </Head>

      <Box height="100vh" display="flex" flexDirection="column">
        <EditAppbar />

        <Box>
          <Grid container>
            <EditNav />
            <EditConsole />
            <EditPalette />
          </Grid>
        </Box>

        <EditFooter />
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user } = await getSession(context.req, context.res);

  const { oriId_p } = await context.params;

  const staff = await axios
    .get(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/staff/read/${user.name}`)
    .then((result) => result.data)
    .catch((err) => console.log(err));

  const patient = await axios
    .post(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/patient/read/oriId_p`, {
      oriId_p: oriId_p,
    })
    .then((result) => result.data)
    .catch((err) => console.log(err));

  return {
    props: {
      staff: staff ?? null,
      patient: patient ?? null,
    },
  };
};

export default oriId_p;
