import { profileActions } from "./actions";
import { Dispatch } from "redux";
import { Address } from "../../domain/entity/address";
import {
  isCompletePostalCode,
  sanitizePostalCode,
} from "../../domain/services/address";

export const searchAddressFromPostalCode =
  (code: string) => async (dispatch: Dispatch) => {
    if (!isCompletePostalCode(code)) return;

    const result = await fetch(
      `https://apis.postcode-jp.com/api/v3/postcodes?apikey=z1YhJ57urN4Y5uNdKE7V8f300sldjBwcAdisw3E&postcode=${sanitizePostalCode(
        code
      )}`
    ).then((res) => res.json());

    if (!result.data[0]) return;

    const address: Partial<Address> = {
      prefecture: result.data[0].pref,
      city: result.data[0].city + result.data[0].town,
    };

    dispatch(
      profileActions.searchAddress.done({ result: address, params: {} })
    );
  };
