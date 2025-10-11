export type ChallengesFilter = 'all' | 'resolved' | 'failed';

export interface ChallengeModel {
  id: string;
  factorA: number;
  factorB: number;
  guess: number;
  user: string;
  message: string;
}

export interface ChallengeStateModel {
  loading: boolean;
  error: string | null;
  currentChallenge: ChallengeModel;   
  challenges: ChallengeModel[];
  filter?: ChallengesFilter;
}