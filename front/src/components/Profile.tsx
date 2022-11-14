import React from "react";
import { Button, Container, Typography } from "@material-ui/core";

import { Basic } from "./Basic";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../domain/entity/rootState";
import { calculateValidation, isValid } from "../domain/services/validation";
import { validationActions } from "../store/validation/actions";
import { Address } from "./Address";
import { College } from "./College";
import { Career } from "./Career";
import { Validation } from "../domain/entity/validation";
import { alertActions } from "../store/alert/actions";

export const Profile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);

  const handleSave = () => {
    const message: Validation = calculateValidation(profile);

    if (isValid(message)) {
      dispatch(
        alertActions.openAlert({
          severity: "success",
          message: "saved!",
        })
      );
      return;
    }
    dispatch(validationActions.setValidation(message));
    dispatch(validationActions.setIsStartValidation(true));
    dispatch(
      alertActions.openAlert({
        severity: "error",
        message: "error!",
      })
    );
  };

  return (
    <Container maxWidth="sm">
      <Typography
        variant="h4"
        component="h2"
        className={classes.title}
        color="primary"
      >
        Basic Information
      </Typography>
      <Basic />
      <Typography
        variant="h4"
        component="h2"
        className={classes.title}
        color="primary"
      >
        Address
      </Typography>
      <Address />
      <Typography
        variant="h4"
        component="h2"
        className={classes.title}
        color="primary"
      >
        Educational background
      </Typography>
      <College />
      <Typography
        variant="h4"
        component="h2"
        className={classes.title}
        color="primary"
      >
        Work history
      </Typography>
      <Career />
      <Button
        fullWidth
        className={classes.button}
        onClick={handleSave}
        variant="outlined"
        color="primary"
      >
        保存
      </Button>
    </Container>
  );
};
