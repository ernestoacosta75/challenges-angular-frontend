import { ChallengesFilter } from "@features/challenge/state/challenge.model";

export class GetChallenge {
    static readonly type = '[ChallengeState] Get Challenge';
    constructor() {}
}

export class GetUsers {
    static readonly type = '[ChallengeState] Get Users';
    constructor(public readonly userIds: string[]) {}
}

export class SendGuess {
    static readonly type = '[ChallengeState] Send Guess';
    constructor(public readonly user: string, public readonly factorA: number, 
        public readonly factorB: number, public readonly guess: number) {}
}

export class FilterChallenges {
    static readonly type = '[ChallengeState] Filter';
    constructor(public readonly payload: ChallengesFilter) {}
}