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