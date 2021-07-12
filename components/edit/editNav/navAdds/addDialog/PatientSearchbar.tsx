import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookie from "js-cookie";

import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { searchAdd } from "../../../../../redux/addSlice";

const PatientSearchbar: React.FC = () => {
  const [category, setCategory] = useState("name");
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const categoryChange: (
    e: React.ChangeEvent<{
      name?: string;
      value: string;
    }>,
    child: React.ReactNode
  ) => void = (e) => {
    setCategory(e.target.value);
  };

  const searchChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (e) => {
    const id = Cookie.get("miId");

    setSearch(e.target.value);
    dispatch(
      searchAdd({ oriId_m: id, category: category, search: e.target.value })
    );
  };

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      py="8px"
      borderColor="grey.300"
      borderBottom={1}
    >
      <Box mx="10px">
        <FormControl variant="outlined" size="small">
          <FormLabel>検索条件</FormLabel>

          <Select
            defaultValue="name"
            value={category}
            onChange={categoryChange}
          >
            <MenuItem value="name">名前</MenuItem>

            <MenuItem value="disease">既往症</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box width="100%" mt="16px">
        <TextField
          variant="outlined"
          size="small"
          label="検索ワード"
          value={search}
          onChange={searchChange}
          fullWidth
        />
      </Box>
    </Box>
  );
};

export default PatientSearchbar;
