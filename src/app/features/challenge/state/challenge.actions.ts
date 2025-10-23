import { ChallengeModel, ChallengesFilter } from "@features/challenge/state/challenge.model";

export class GetChallenge {
    static readonly type = '[ChallengeState] Get Challenge';
    constructor() {}
}

export class GetStatsForUser {
    static readonly type = '[ChallengeState] Get Stats For User';
    constructor(public readonly userAlias: string) {}
}

export class GetAllAttempts {
    static readonly type = '[ChallengeState] Get All Attempts';
    constructor() {}
}

export class GetUsersByIds {
    static readonly type = '[ChallengeState] Get Users By Ids';
    constructor(public readonly userIds: string[]) {}
}

export class SendGuess {
    static readonly type = '[ChallengeState] Send Guess';
    constructor(public readonly payload: Partial<ChallengeModel>) {}
}

export class FilterChallenges {
    static readonly type = '[ChallengeState] Filter';
    constructor(public readonly payload: ChallengesFilter) {}
}
