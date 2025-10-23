export interface UserModel {
    userId: number | null;
    userAlias: string;
}

export interface AppStateModel {
    loading: boolean;
    error: string | null;    
    users: UserModel[];
}