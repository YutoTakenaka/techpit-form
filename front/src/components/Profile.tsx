import React from "react";
import { Container, Typography } from "@material-ui/core";

import { Basic } from "./Basic";
import useStyles from "./styles";

export const Profile = () => {
  const classes = useStyles();

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
    </Container>
  );
};
