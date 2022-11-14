import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../domain/entity/rootState";
import { collegeActions } from "../store/colleges/action";
import { searchColleges } from "../store/colleges/effects";
import useStyles from "./styles";
import { College as ICollege } from "../domain/entity/college";
import { profileActions } from "../store/profile/actions";
import { PROFILE } from "../domain/services/profile";
import { calculateValidation } from "../domain/services/validation";
import { validationActions } from "../store/validation/actions";

export const College = () => {
  const dispatch = useDispatch();
  const colleges = useSelector((state: RootState) => state.college);
  const profile = useSelector((state: RootState) => state.profile);
  const classes = useStyles();
  const validation = useSelector((state: RootState) => state.validation);

  const handleChange = (name: string) => {
    dispatch(collegeActions.setSearchWord(name));
  };

  const handleSearch = () => {
    dispatch(searchColleges(colleges.search));
  };

  const handleCollegeChange = (member: Partial<ICollege>) => {
    dispatch(profileActions.setCollege(member));
    recalculateValidation(member);
  };

  const handleReset = () => {
    handleCollegeChange({ name: "", faculty: "", department: "" });
    dispatch(collegeActions.setSearchWord(""));
    dispatch(collegeActions.searchCollege.done({ result: [], params: {} }));
  };

  const selectedCollege = colleges.result.filter(
    (college) => college.name === profile.college.name
  )[0];

  const selectedFaculty = selectedCollege?.faculty.filter(
    (faculty) => faculty.name === profile.college.faculty
  )[0];

  const recalculateValidation = (member: Partial<ICollege>) => {
    if (!validation.isStartValidation) return;

    const newProfile = {
      ...profile,
      college: { ...profile.college, ...member },
    };
    const message = calculateValidation(newProfile);
    dispatch(validationActions.setValidation(message));
  };

  return (
    <>
      {!profile.college.name && (
        <>
          <TextField
            className={classes.formField}
            fullWidth
            label="Search college"
            value={colleges.search}
            onChange={(e) => handleChange(e.target.value)}
          />
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={handleSearch}
            disabled={!colleges.search}
          >
            Search
          </Button>
          <Grid spacing={1} container>
            {colleges.result.map((college) => (
              <Grid key={college.name} item>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleCollegeChange({ name: college.name })}
                >
                  {college.name}
                </Button>
              </Grid>
            ))}
          </Grid>
        </>
      )}
      {profile.college.name && (
        <>
          <TextField
            className={classes.formField}
            label={PROFILE.COLLEGE.NAME}
            fullWidth
            value={profile.college.name}
            disabled
          />
          <FormControl fullWidth className={classes.formField}>
            <InputLabel>{PROFILE.COLLEGE.FACULTY}</InputLabel>
            <Select
              value={profile.college.faculty}
              onChange={(e) =>
                handleCollegeChange({
                  faculty: e.target.value as string,
                  department: "",
                })
              }
            >
              {selectedCollege?.faculty.map((faculty) => (
                <MenuItem key={faculty.name} value={faculty.name}>
                  {faculty.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {validation.message.college.faculty}
            </FormHelperText>
          </FormControl>
          {selectedFaculty?.department.length > 0 && (
            <FormControl fullWidth className={classes.formField} required>
              <InputLabel>{PROFILE.COLLEGE.DEPARTMENT}</InputLabel>
              <Select
                value={profile.college.department}
                onChange={(e) =>
                  handleCollegeChange({ department: e.target.value as string })
                }
              >
                {selectedFaculty.department.map((department) => (
                  <MenuItem key={department} value={department}>
                    {department}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <Button
            fullWidth
            className={classes.button}
            onClick={handleReset}
            variant="outlined"
            color="secondary"
          >
            Reset
          </Button>
        </>
      )}
    </>
  );
};
