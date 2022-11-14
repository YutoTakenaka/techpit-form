import React, { Fragment } from "react";
import {
  TextField,
  Grid,
  InputLabel,
  Typography,
  Button,
} from "@material-ui/core";
import { PROFILE } from "../domain/services/profile";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../domain/entity/rootState";
import { Career as ICareer } from "../domain/entity/career";
import { profileActions } from "../store/profile/actions";
import { exitEmptyCareers } from "../domain/services/career";
import { calculateValidation } from "../domain/services/validation";
import { validationActions } from "../store/validation/actions";

export const Career = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const careers: ICareer[] = useSelector(
    (state: RootState) => state.profile.careers
  );
  const profile = useSelector((state: RootState) => state.profile);
  const validation = useSelector((state: RootState) => state.validation);
  const canAddCareer: boolean = exitEmptyCareers(careers);

  const handleChange = (member: Partial<ICareer>, i: number) => {
    dispatch(profileActions.setCareer({ career: member, index: i }));
    recalculateValidation(member, i);
  };

  const handleAddCareer = () => {
    dispatch(profileActions.addCareer({}));
  };

  const handleDeleteCareer = (i: number) => {
    dispatch(profileActions.deleteCareer(i));
  };

  const recalculateValidation = (member: Partial<ICareer>, i: number) => {
    if (!validation.isStartValidation) return;

    const newProfile = {
      ...profile,
      careers: profile.careers.map((career, _i) =>
        _i === i ? { ...career, ...member } : career
      ),
    };
    const message = calculateValidation(newProfile);
    dispatch(validationActions.setValidation(message));
  };
  return (
    <>
      {careers.map((career, i) => (
        <Fragment key={i}>
          <Typography variant="h5" component="h3" className={classes.title}>
            Work history {i + 1}
          </Typography>
          <TextField
            className={classes.formField}
            fullWidth
            label={PROFILE.CAREERS.COMPANY}
            value={career.company}
            onChange={(e) => handleChange({ company: e.target.value }, i)}
            error={!!validation.message.careers[i]?.company}
            helperText={validation.message.careers[i]?.company}
          />
          <TextField
            className={classes.formField}
            fullWidth
            label={PROFILE.CAREERS.POSITION}
            value={career.position}
            onChange={(e) => handleChange({ position: e.target.value }, i)}
            error={!!validation.message.careers[i]?.position}
            helperText={validation.message.careers[i]?.position}
          />
          <div className={classes.careerSpan}>
            <InputLabel shrink>{PROFILE.CAREERS.SPAN}</InputLabel>
            <Grid
              container
              spacing={1}
              alignContent="space-between"
              alignItems="center"
            >
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  type="month"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={career.startAt}
                  onChange={(e) => handleChange({ startAt: e.target.value }, i)}
                  error={!!validation.message.careers[i]?.startAt}
                  helperText={validation.message.careers[i]?.startAt}
                />
              </Grid>
              <Grid item xs={2}>
                <Typography align="center">〜</Typography>
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  type="month"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={career.endAt}
                  onChange={(e) => handleChange({ endAt: e.target.value }, i)}
                  error={!!validation.message.careers[i]?.endAt}
                  helperText={validation.message.careers[i]?.endAt}
                />
              </Grid>
            </Grid>
          </div>
          <Button
            className={classes.button}
            onClick={() => handleDeleteCareer(i)}
            fullWidth
            variant="outlined"
          >
            Delete work history{i + 1}
          </Button>
        </Fragment>
      ))}

      <Button
        className={classes.button}
        onClick={handleAddCareer}
        fullWidth
        variant="outlined"
        disabled={canAddCareer}
      >
        Add work history
      </Button>
    </>
  );
};
