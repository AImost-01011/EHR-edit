import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import EditAppbar from "../../components/edit/EditAppbar";
import EditNav from "../../components/edit/EditNav";
import EditTop from "../../components/edit/EditTop";
import EditFooter from "../../components/edit/EditFooter";
import { GetServerSideProps } from "next";
import { getSession } from "@auth0/nextjs-auth0";
import axios from "axios";
import { oneStaffDataType } from "../../globalType";
import { fetchStaff, serversideData } from "../../redux/oneStaffSlice";
import { fetchNavList } from "../../redux/patientSlice";
import { RootState } from "../../redux/store";

const index: React.FC<{ staff: oneStaffDataType }> = ({ staff }) => {
  const dispatch = useDispatch();
  const staffSelector = useSelector((state: RootState) => state.oneStaff);

  useEffect(() => {
    dispatch(serversideData(staff));
    dispatch(fetchStaff({ email_s: staff.email }));
  }, []);

  useEffect(() => {
    if (staffSelector.oriId_s) {
      dispatch(fetchNavList({ navListSave: staffSelector.navListSave }));

      axios.post("/api/staff/update/isLogin", {
        oriId_s: staffSelector.oriId_s,
      });
    }
  }, [staffSelector.navListSave.length]);

  return (
    <>
      <Head>
        <title>EHR Edit</title>
      </Head>

      <Box height="100%" display="flex" flexDirection="column">
        <EditAppbar />

        <Box flexGrow={1}>
          <Grid container>
            <EditNav />
            <EditTop />
          </Grid>
        </Box>

        <EditFooter />
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user } = await getSession(context.req, context.res);

  const staff = await axios
    .get(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/staff/read/${user.name}`)
    .then((result) => result.data)
    .catch((err) => console.log(err));

  return {
    props: {
      staff: staff ?? null,
    },
  };
};

export default index;
