import Box from "@material-ui/core/Box";
import React, { useEffect } from "react";
import EditAppbar from "../../../components/edit/EditAppbar";
import Grid from "@material-ui/core/Grid";
import EditNav from "../../../components/edit/EditNav";
import EditFooter from "../../../components/edit/EditFooter";
import EditSettings from "../../../components/edit/EditSettings";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { getSession } from "@auth0/nextjs-auth0";
import axios from "axios";
import { oneStaffDataType } from "../../../globalType";
import { useDispatch } from "react-redux";
import { fetchStaff, serversideData } from "../../../redux/oneStaffSlice";

const Settings: React.FC<{
  staff: oneStaffDataType;
}> = ({ staff }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(serversideData(staff));
    dispatch(fetchStaff({ email_s: staff.email }));
  }, [staff]);

  return (
    <>
      <Head>
        <title>EHR Editの設定</title>
      </Head>

      <Box height="100vh" display="flex" flexDirection="column">
        <EditAppbar />

        <Box>
          <Grid container>
            <EditNav />
            <EditSettings />
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

export default Settings;
