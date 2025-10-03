import { ChallengeStateModel } from './challenge.model';
import { Selector } from "@ngxs/store";
import { ChallengeState } from "./challenge.state";

export class ChallengeStateSelectors {
    @Selector([ChallengeState])
    static getChallenges(state: ChallengeStateModel) {
        return state.challenges;
    }