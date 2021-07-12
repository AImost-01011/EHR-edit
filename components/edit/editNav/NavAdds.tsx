import React from "react";
import { useDispatch } from "react-redux";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { openAddDia, openCreateDia } from "../../../redux/supporterSlice";
import CreateDialog from "./navAdds/CreateDialog";
import AddDialog from "./navAdds/AddDialog";

const NavAdds: React.FC = () => {
  const dispatch = useDispatch();

  const openCreate = () => {
    dispatch(openCreateDia());
  };

  const openAdd = () => {
    dispatch(openAddDia());
  };

  return (
    <>
      <Box
        width="100%"
        display="flex"
        flexDirection="row"
        justifyContent="space-around"
      >
        <Box width="40%">
          <Button
            variant="outlined"
            color="primary"
            size="small"
            fullWidth
            onClick={openCreate}
          >
            新規作成
          </Button>
        </Box>
        <Box width="40%">
          <Button
            variant="outlined"
            color="primary"
            size="small"
            fullWidth
            onClick={openAdd}
          >
            追加
          </Button>
        </Box>
      </Box>

      <CreateDialog />

      <AddDialog />
    </>
  );
};

export default NavAdds;
