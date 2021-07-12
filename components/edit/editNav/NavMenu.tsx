import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";

import { List, ListItem, ListItemText, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { RootState } from "../../../redux/store";
import { setNavListSave } from "../../../redux/oneStaffSlice";

const NavMenu: React.FC = () => {
  const patientSelector = useSelector((state: RootState) => state.patient);
  const staffSelector = useSelector((state: RootState) => state.oneStaff);
  const dispatch = useDispatch();

  const deleteClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    const newNavList = staffSelector.navListSave.filter(
      (el) => el !== e.currentTarget.value
    );
    dispatch(
      setNavListSave({
        oriId_s: staffSelector.oriId_s,
        navListSave: [...newNavList],
      })
    );
  };

  let navList = patientSelector.patient.map((el, i) => {
    return (
      <Link
        href="/edit/detail/:oriId_p"
        as={`/edit/detail/${el.oriId_p}`}
        key={i}
      >
        <ListItem divider button id={`${el.oriId_p}@navItem`}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Box>
              <Link href="/edit">
                <Button
                  size="small"
                  variant="outlined"
                  value={el.oriId_p}
                  onClick={deleteClick}
                >
                  消去
                </Button>
              </Link>
            </Box>
            <Typography variant="body1">{el.patientName.name}</Typography>
          </Box>
        </ListItem>
      </Link>
    );
  });

  return (
    <Box>
      <List>{navList}</List>
    </Box>
  );
};

export default NavMenu;
