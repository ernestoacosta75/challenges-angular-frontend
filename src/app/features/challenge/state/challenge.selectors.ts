import { ChallengeStateModel } from '@features/challenge/state/challenge.model';
import { Selector } from '@ngxs/store';
import { ChallengeState } from '@features/challenge/state/challenge.state';

export class ChallengeStateSelectors {
  @Selector([ChallengeState])
  static getChallenges(state: ChallengeStateModel) {
    return state.challenges;
  }

  @Selector([ChallengeState])
  static getChallenge(state: ChallengeStateModel) {
    return state.currentChallenge;
  }

  @Selector([ChallengeState])
  static filter(state: ChallengeStateModel) {
    return state.filter ?? 'all';
  }

  @Selector([ChallengeState])
  static loading(state: ChallengeStateModel) {
    return state.loading;
  }

  @Selector([ChallengeState])
  static userAlias(state: ChallengeStateModel) {
    return state.userAlias ?? '';
  }

  @Selector([ChallengeState])
  static counts(state: ChallengeStateModel) {
    const all = state.challenges.length;
    const resolved = state.challenges.filter(t => (t.factorA * t.factorB) === t.guess).length;
    return { all, resolved, failed: all - resolved };
  }  

  @Selector([ChallengeState])
  static filteredChallenges(state: ChallengeStateModel) {
    if (!state || !state.challenges) {
      return [];
    }
    
    const f = state.filter ?? 'all';

    if (f === 'all') return state.challenges;
    if (f === 'resolved')
      return state.challenges.filter((c) => c.factorA * c.factorB === c.guess);
    return state.challenges.filter((c) => c.factorA * c.factorB !== c.guess);
  }
}
