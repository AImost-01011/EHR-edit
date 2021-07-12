import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { updateOpenCards } from "../../redux/supporterSlice";

const EditPalette: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const dispatch = useDispatch();

  const cardChange: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    value: any
  ) => void = (e, value) => {
    dispatch(updateOpenCards(value));
    setSelected(value);
  };

  return (
    <Grid xs={3} item>
      <Box height="100%" style={{ overflowY: "scroll" }}>
        <Box
          height="44px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderBottom={1}
          borderColor="primary"
        >
          <Typography variant="body1" color="primary">
            入力カード
          </Typography>
        </Box>

        <Box px="14px" py="7px">
          <ToggleButtonGroup
            size="small"
            value={selected}
            onChange={cardChange}
          >
            <ToggleButton value="vitalData">バイタルデータ</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
    </Grid>
  );
};

export default EditPalette;
