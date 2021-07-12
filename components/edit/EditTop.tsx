import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import React from "react";

import {
  TableContainer,
  TableBody,
  TableRow,
  Table,
  TableCell,
  TableHead,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const EditTop: React.FC = () => {
  return (
    <Grid item xs={10}>
      <Box
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box width="800px">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>EHR Editのトップページ</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow>
                  <TableCell>
                    <Button size="small" fullWidth>
                      新規作成
                    </Button>
                  </TableCell>
                  <TableCell>
                    患者データを1からつくり患者一覧に追加します。
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <Button size="small" fullWidth>
                      追加
                    </Button>
                  </TableCell>
                  <TableCell>患者データを患者一覧に追加します。</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <Button size="small" fullWidth>
                      設定
                    </Button>
                  </TableCell>
                  <TableCell>
                    EHR Editを快適に使うために設定をすることができます。
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Grid>
  );
};

export default EditTop;
