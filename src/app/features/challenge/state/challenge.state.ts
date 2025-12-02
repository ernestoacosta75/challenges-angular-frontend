import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { GetAllAttempts, GetChallenge, GetStatsForUser, SendGuess } from "@features/challenge/state/challenge.actions";
import { ChallengeStateModel } from "@features/challenge/state/challenge.model";
import { ChallengeApiService } from "@features/challenge/services/challenge-api-service";
import { tap } from "rxjs";
import { append, patch } from "@ngxs/store/operators";
import * as R from 'ramda';
import { UserApiService } from "@app/app/services/user/user-api-service";
import { GetAllUsers } from "@app/app/state/app.actions";

@State({
  name: 'challengeState',
  defaults: {
    loading: false,
    error: null,
    challenges: []
  }
})
@Injectable()
export class ChallengeState {

    constructor(private challengeApiService: ChallengeApiService,
      private userApiService: UserApiService
    ) {}

    @Action(GetChallenge)
    getChallenge(ctx: StateContext<ChallengeStateModel>, action: GetChallenge) {
        return this.challengeApiService.getChallenge()
        .pipe(tap((returnData: any) => {
            const state = ctx.getState();

            ctx.setState({
                ...state,
                currentChallenge: returnData
            })
        }))
    }

    @Action(GetStatsForUser)
    getStatsForUser(ctx: StateContext<ChallengeStateModel>, action: GetStatsForUser) {
      var userAliasFromState = R.pathOr('', ['userAlias'], ctx.getState());

      return this.challengeApiService.getStatsForUser(R.pathOr(userAliasFromState, ['userAlias'], action))
      .pipe(tap((returnData: any) => {
          const state = ctx.getState();
          ctx.setState({
              ...state,
              userAlias: R.pathOr(userAliasFromState, ['user', 'alias'], returnData[0]),
              challenges: returnData
          })
      }))
    }     

    @Action(GetAllAttempts)
    getAllAttempts(ctx: StateContext<ChallengeStateModel>, action: GetAllAttempts) {
      return this.challengeApiService.getAllAttempts()
      .pipe(tap((returnData: any) => {
          const state = ctx.getState();
          ctx.setState({
              ...state,
              challenges: returnData
          })
      }))
    }    

    @Action(SendGuess)
    sendGuess(ctx: StateContext<ChallengeStateModel>, action: SendGuess) { 
      ctx.setState(patch({ userAlias: R.pathOr('', ['payload', 'userAlias'], action) }));
      return this.challengeApiService.sendGuess(action.payload)
      .pipe(
        tap((result: any) => ctx.setState(patch({
          challenges: append([result]),
          loading: false
        }))),
        tap(() => ctx.dispatch(new GetStatsForUser(ctx.getState().userAlias ?? ''))),
        tap(() => ctx.dispatch(new GetAllUsers())),
        tap(() => ctx.dispatch(new GetChallenge()))
      );
    }    
}