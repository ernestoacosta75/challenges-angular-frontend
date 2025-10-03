import { ChallengeStateModel } from '@features/challenge/state/challenge.model';
import { Selector } from "@ngxs/store";
import { ChallengeState } from "@features/challenge/state/challenge.state";

export class ChallengeStateSelectors {
    
    @Selector([ChallengeState])
    static getChallenges(state: ChallengeStateModel) {
        return state.challenges;
    }

    @Selector([ChallengeState])
    static filter(state: ChallengeStateModel) {
      return state.filter ?? 'all';
    }

    @Selector([ChallengeState])
    static filteredChallenges(state: ChallengeStateModel) {
      const f = state.filter ?? 'all';

      if (f === 'all') return state.challenges;
      if (f === 'successful') return state.challenges.filter(c => c.factorA * c.factorB === c.guess);
      return state.challenges.filter(c => c.factorA * c.factorB !== c.guess);
    }  
}