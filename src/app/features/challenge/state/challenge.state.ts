import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { GetChallenge, SendGuess } from "@features/challenge/state/challenge.actions";
import { ChallengeStateModel } from "@features/challenge/state/challenge.model";
import { ChallengeApiService } from "@features/challenge/services/challenge-api-service";
import { tap } from "rxjs";
import { append, patch } from "@ngxs/store/operators";

@State({
  name: 'challenges',
  defaults: {
    loading: false,
    error: null,
    items: []
  }
})
@Injectable()
export class ChallengeState {

    constructor(private challengeApiService: ChallengeApiService) {}

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

    @Action(SendGuess)
    sendGuess(ctx: StateContext<ChallengeStateModel>, action: SendGuess) { 
      return this.challengeApiService.sendGuess(action.payload)
      .pipe(
        tap((result: any) => ctx.setState(patch({
          challenges: append([result]),
          loading: false
        }))),
        tap(() => ctx.dispatch(new GetChallenge()))
      );
    }    
}