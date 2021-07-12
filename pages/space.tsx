import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";

import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const Space: React.FC = () => {
  const [miName, setMiName] = useState("");
  const [miSpace, setMiSpace] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const inputName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setMiName(e.target.value);
  };

  const inputSpace: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setMiSpace(e.target.value);
  };

  const cookieClick = () => {
    axios.post(`/api/mi/read/miId`, { miName: miName }).then((result) => {
      if (result.data) {
        Cookies.set("miId", result.data, { expires: 90 });
        Cookies.set("space", miSpace, { expires: 90 });
        router.push("/");
      } else {
        setErrorMessage(
          "医療機関の名前が間違っています。正式名称で入力してください"
        );
      }
    });
  };

  return (
    <>
      <Head>
        <title>このEHR Editを使う場所</title>
      </Head>

      <Box
        width="100vw"
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Paper>
          <Box mx="30px" my="20px" display="flex" flexDirection="column">
            <Typography variant="h5" color="primary">
              このEHR Editを使っている場所を入力してください
            </Typography>

            <Box my="10px" width="100%">
              <TextField
                label="EHR Editを使う医療機関の名前"
                value={miName}
                onChange={inputName}
                variant="filled"
                size="small"
                fullWidth
              />
              <Typography variant="body2" color="secondary">
                {errorMessage}
              </Typography>
            </Box>

            <Box my="10px" width="100%">
              <TextField
                label="EHR Editを使う部屋"
                value={miSpace}
                onChange={inputSpace}
                variant="filled"
                size="small"
                fullWidth
              />
            </Box>

            <Box my="10px" display="flex" justifyContent="center">
              <Button variant="outlined" color="primary" onClick={cookieClick}>
                決定
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default Space;
