import { AuthState } from "../../../../features/checkAuth";

export interface StateSchema {
  auth: AuthState;
  trEnglishApi: any;
  translationApi: any;
}
