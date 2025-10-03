import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { GetChallenge } from "./challenge.actions";
import { ChallengeStateModel } from "./challenge.model";
import { ChallengeApiService } from "../services/challenge-api-service";
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
                challenges: returnData
            })
        }))
    }
}