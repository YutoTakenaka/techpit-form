import React from "react";
import { TextField } from "@material-ui/core";
import { PROFILE } from "../domain/services/profile";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../domain/entity/rootState";
import { Address as IAddress } from "../domain/entity/address"; // IはinterfaceのI
import { profileActions } from "../store/profile/actions";
import { isPostalCode } from "../domain/services/address";
import { searchAddressFromPostalCode } from "../store/profile/effects";

export const Address = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);

  const handleAddressChange = (member: Partial<IAddress>) => {
    dispatch(profileActions.setAddress(member));
  };

  const handlePostalCodeChange = (code: string) => {
    if (!isPostalCode(code)) return;
    dispatch(profileActions.setAddress({ postalCode: code }));
    dispatch(searchAddressFromPostalCode(code));
  };
  return (
    <>
      <TextField
        fullWidth
        className={classes.formField}
        label={PROFILE.ADDRESS.POSTAL_CODE}
        value={profile.address.postalCode}
        onChange={(e) => handlePostalCodeChange(e.target.value)}
      />
      <TextField
        fullWidth
        className={classes.formField}
        label={PROFILE.ADDRESS.PREFECTURE}
        value={profile.address.prefecture}
        onChange={(e) => handleAddressChange({ prefecture: e.target.value })}
      />
      <TextField
        fullWidth
        className={classes.formField}
        label={PROFILE.ADDRESS.CITY}
        value={profile.address.city}
        onChange={(e) => handleAddressChange({ city: e.target.value })}
      />
      <TextField
        fullWidth
        className={classes.formField}
        label={PROFILE.ADDRESS.RESTARRESS}
        value={profile.address.restAddress}
        onChange={(e) => handleAddressChange({ restAddress: e.target.value })}
      />
    </>
  );
};
