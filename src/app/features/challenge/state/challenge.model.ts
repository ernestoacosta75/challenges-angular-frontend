export type ChallengesFilter = 'all' | 'resolved' | 'failed';

export interface ChallengeModel {
  id: string;
  factorA: number;
  factorB: number;
  guess: number;
  userAlias: string;
  message: string;
}

export interface ChallengeStateModel {
  loading: boolean;
  error: string | null;
  userAlias?: string;
  currentChallenge: ChallengeModel;   
  challenges: ChallengeModel[];
  filter?: ChallengesFilter;
}