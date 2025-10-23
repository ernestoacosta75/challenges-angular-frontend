import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { GetAllUsers } from "./app.actions";
import { UserApiService } from "../services/user/user-api-service";
import { AppStateModel } from "./app.model";
import { tap } from "rxjs";

@State({
  name: 'appState',
  defaults: {
    loading: false,
    error: null,
    users: []
  }
})
@Injectable()
export class AppState {

    constructor(private userApiService: UserApiService) {

    }

    @Action(GetAllUsers)
    getUsers(ctx: StateContext<AppStateModel>, action: GetAllUsers) {
      return this.userApiService.getAllUsers()
      .pipe(tap((returnData: any) => {
          const state = ctx.getState();
          ctx.setState({
              ...state,
              users: returnData
          })
      }))
    }     
}