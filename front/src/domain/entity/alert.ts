export type AlertState = {
  severity: AlertSeverity; // alertの種類
  message: string; // alertに表示するメッセージ
  open?: boolean; // snackbarを表示しているかどうか
};

// severityは`error` or `success`のどちらか
export type AlertSeverity = "error" | "success";
