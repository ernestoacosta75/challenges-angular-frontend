import { Selector } from "@ngxs/store";
import { AppStateModel } from "./app.model";
import { AppState } from "./app.state";
import * as R from 'ramda';

export class AppStateSelectors {
  @Selector([AppState])
  static getUsers(state: AppStateModel) {
    return R.pathOr([], ['users'], state);
  }
}