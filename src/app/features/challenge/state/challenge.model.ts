export interface ChallengeModel {
  id: string;
  factorA: number;
  factorB: number;
  guess: number;
  user: string;
  message: string;
}

export interface ChallengeStateModel {
    challenges: ChallengeModel[];
}