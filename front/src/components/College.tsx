import { TextField } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../domain/entity/rootState";
import { collegeActions } from "../store/colleges/action";
import useStyles from "./styles";

export const College = () => {
  const dispatch = useDispatch();
  const colleges = useSelector((state: RootState) => state.college);
  const classes = useStyles();

  const handleChange = (name: string) => {
    dispatch(collegeActions.setSearchWord(name));
  };

  return (
    <>
      <TextField
        className={classes.formField}
        fullWidth
        label="Search college"
        value={colleges.search}
        onChange={(e) => handleChange(e.target.value)}
      />
    </>
  );
};
