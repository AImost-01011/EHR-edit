import React from "react";
import Link from "next/link";
import Head from "next/head";
import { useSelector } from "react-redux";

import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { RootState } from "../../redux/store";

const index: React.FC = () => {
  const staffSelector = useSelector((state: RootState) => state.oneStaff);

  const checkMail = () => {
    window.alert(
      `あなたが登録したメールアドレスは${staffSelector.email}です。`
    );
  };

  return (
    <>
      <Head>
        <title>EHR Editへようこそ</title>
      </Head>

      <Box
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Paper>
          <Box
            width="600px"
            height="360px"
            paddingX="30px"
            paddingY="20px"
            overflow="auto"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box my="10px">
              <Typography variant="h4" color="primary">
                EHR Editへようこそ
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                EHR Editを使うためにEHR Controlでのアカウント作成が必要です。
              </Typography>
            </Box>

            <Box
              my="10px"
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Typography variant="body1" color="initial">
                アカウント作成で今登録したメールアドレスが必要となります。
              </Typography>
              <Button variant="outlined" color="primary" onClick={checkMail}>
                登録したメールアドレスを確認する
              </Button>
            </Box>

            <Box my="10px">
              <Link href="/api/auth/logout">
                <Button variant="contained" color="primary">
                  ホーム画面に戻る
                </Button>
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default index;
