import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import Head from "next/head";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Circular from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { fetchStaff } from "../redux/oneStaffSlice";
import { RootState } from "../redux/store";

export default function Home() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();
  const staffSelector = useSelector((state: RootState) => state.oneStaff);

  useEffect(() => {
    if (user && !staffSelector.email) {
      dispatch(fetchStaff({ email_s: user.email }));
    }
  }, [user]);

  useEffect(() => {
    if (!staffSelector.loading && user) {
      if (staffSelector.oriId_s) {
        const cookieId = Cookies.get("miId");

        if (cookieId) {
          router.push("/edit");
        } else {
          router.push("/space");
        }
      } else {
        router.push("/welcome");
      }
    }
  }, [staffSelector.oriId_s]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <>
        <Head>
          <title>アカウント情報を確認しています</title>
        </Head>

        <Box
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h4" color="primary">
            アカウント情報を確認しています.....
          </Typography>
          <Box paddingY="30px">
            <Circular color="primary" size={60} />
          </Box>
        </Box>
      </>
    );
  }

  const loginClick = () => {
    router.push("/api/auth/login");
  };

  return (
    <>
      <Head>
        <title>EHR Editのログイン</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Paper elevation={3}>
          <Box
            width="400px"
            height="250px"
            paddingX="20px"
            paddingY="30px"
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="h4">EHR Edit</Typography>
            <Typography variant="subtitle1">
              診察をサポートするカルテ
            </Typography>

            <Button variant="outlined" color="primary" onClick={loginClick}>
              ログイン ＆ 新規アカウント作成
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
