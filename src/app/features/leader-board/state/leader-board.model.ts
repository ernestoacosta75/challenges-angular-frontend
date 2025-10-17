export interface LeaderBoardRowModel {
    userId: string;
    userAlias?: string;
    totalScore: number;
    badges: number [];
}

export interface LeaderBoardStateModel {
    loading: boolean;
    error: string | null;
    leadersBoard: LeaderBoardRowModel[];
}