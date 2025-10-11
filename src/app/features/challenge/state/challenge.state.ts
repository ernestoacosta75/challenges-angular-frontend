import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { GetChallenge } from "@features/challenge/state/challenge.actions";
import { ChallengeStateModel } from "@features/challenge/state/challenge.model";
import { ChallengeApiService } from "@features/challenge/services/challenge-api-service";
import { tap } from "rxjs";

@State({
  name: 'ChallengeState',
  defaults: {
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
}