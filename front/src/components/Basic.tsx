import React from "react";
import {
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from "@material-ui/core";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../domain/entity/rootState";
import { Profile } from "../domain/entity/profile";
import { profileActions } from "../store/profile/actions";
import { PROFILE } from "../domain/services/profile";
import { Gender } from "../domain/entity/gender";
import { Address } from "./Address";
import { Career } from "./Career";

export const Basic = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);

  const handleChange = (member: Partial<Profile>) => {
    dispatch(profileActions.setProfile(member));
  };

  return (
    <>
      <TextField
        fullWidth
        className={classes.formField}
        label={PROFILE.NAME}
        value={profile.name}
        onChange={(e) => handleChange({ name: e.target.value })}
      />
      <TextField
        fullWidth
        multiline
        className={classes.formField}
        rows={3}
        label={PROFILE.DESCRIPTION}
        value={profile.description}
        onChange={(e) => handleChange({ description: e.target.value })}
      />
      <FormControl className={classes.formField}>
        <FormLabel>{PROFILE.GENDER}</FormLabel>
        <RadioGroup
          value={profile.gender}
          onChange={(e) => handleChange({ gender: e.target.value as Gender })}
        >
          <FormControlLabel
            value="male"
            label="Male"
            control={<Radio color="primary" />}
          ></FormControlLabel>
          <FormControlLabel
            value="female"
            label="Female"
            control={<Radio color="primary" />}
          ></FormControlLabel>
        </RadioGroup>
      </FormControl>
      <TextField
        fullWidth
        className={classes.formField}
        label={PROFILE.BIRTHDAY}
        type="date"
        value={profile.birthday}
        onChange={(e) => handleChange({ birthday: e.target.value })}
        InputLabelProps={{
          shrink: true,
        }}
      />
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
        Work history
      </Typography>
      <Career />
    </>
  );
};
