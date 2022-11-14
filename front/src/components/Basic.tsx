import React from "react";
import {
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  FormHelperText,
} from "@material-ui/core";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../domain/entity/rootState";
import { Profile } from "../domain/entity/profile";
import { profileActions } from "../store/profile/actions";
import { PROFILE } from "../domain/services/profile";
import { Gender } from "../domain/entity/gender";

export const Basic = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);
  const validation = useSelector((state: RootState) => state.validation);

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
        required
        error={!!validation.message.name}
        helperText={validation.message.name}
      />
      <TextField
        fullWidth
        multiline
        className={classes.formField}
        rows={3}
        label={PROFILE.DESCRIPTION}
        value={profile.description}
        onChange={(e) => handleChange({ description: e.target.value })}
        error={!!validation.message.description}
        helperText={validation.message.description}
      />
      <FormControl
        className={classes.formField}
        required
        error={!!validation.message.gender}
      >
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
        <FormHelperText>{validation.message.gender}</FormHelperText>
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
        required
        error={!!validation.message.birthday}
        helperText={validation.message.birthday}
      />
    </>
  );
};
