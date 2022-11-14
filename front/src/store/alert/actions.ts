import { actionCreatorFactory } from "typescript-fsa";
import { AlertState } from "../../domain/entity/alert";

const actionCreator = actionCreatorFactory();

type AlertPayload = Omit<AlertState, "OPEN">; // AlertStateのopen以外のフィールドという意味
// export type AlertPayload = {
//   severity: AlertSeverity;
//   message: string;
// };  と同じ型という意味になる

export const alertActions = {
  openAlert: actionCreator<AlertPayload>("OPEN_ALERT"),
  closeAlert: actionCreator<{}>("CLOSE_ALERT"),
};
