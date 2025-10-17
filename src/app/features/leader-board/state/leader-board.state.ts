import { LeaderboardApiService } from '@features/leader-board/services/leaderboard-api-service';
import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { GetLeadersBoard } from './leader-board.actions';
import { LeaderBoardRowModel, LeaderBoardStateModel } from './leader-board.model';
import { of, Observable } from 'rxjs';
import { map, switchMap, tap, catchError, finalize } from 'rxjs/operators';
import { UserApiService } from '@app/app/services/user/user-api-service';
import * as R from 'ramda';

@State({
  name: 'leadersBoardState',
  defaults: {
    loading: false,
    error: null,
    leadersBoard: [],
  },
})
@Injectable()
export class LeadersBoardState {
  constructor(
    private leaderboardApiService: LeaderboardApiService,
    private userApiService: UserApiService
  ) {}

  @Action(GetLeadersBoard)
  getLeadersBoard(ctx: StateContext<LeaderBoardStateModel>, action: GetLeadersBoard) {
    // indicate loading
    ctx.patchState({ loading: true, error: null });

    return this.leaderboardApiService.getLeadersBoard().pipe(
      switchMap((rows: LeaderBoardRowModel[] | undefined) => {
        const rowsArr: LeaderBoardRowModel[] = Array.isArray(rows) ? rows : [];

        const userIds: string[] = Array.from(
          new Set(
            rowsArr
              .map((r) => r.userId)
              .filter(id => id !== null && id !== undefined && id !== '')
              .map(String)
          )
        );

        const uniqueUserIds = Array.from(new Set(userIds));

        if (uniqueUserIds.length === 0) {
          return of(R.map((r: LeaderBoardRowModel) => ({ ...r, userAlias: 'Unknown'}), rowsArr));
        }

        return (
          this.userApiService.getUsers(uniqueUserIds) as Observable<
            Array<{ id?: string; userId?: string; userID?: string; alias?: string; name?: string }>>
        ).pipe(
          map((users) => {
            const usersById = R.indexBy((u: any) => String(u.id ?? u.userId ?? u.userID), users);

            return R.map((row: LeaderBoardRowModel) => {
              const u = usersById[String(row.userId)];
              return { ...row, userAlias: u?.alias ?? u?.name ?? 'Unknown' };
            }, rowsArr) as LeaderBoardRowModel[];
          }),
          catchError(() => of(R.map((r: LeaderBoardRowModel) => ({ ...r, userAlias: 'Unknown'}), rowsArr)))
        );
      }),
      tap((enrichedRows: LeaderBoardRowModel[]) =>
        ctx.patchState({ leadersBoard: enrichedRows, error: null })
      ),
      catchError((err) => {
        ctx.patchState({ error: err?.message ?? 'Failed to load leaderboard' });
        return of([] as LeaderBoardRowModel[]);
      }),
      finalize(() => ctx.patchState({ loading: false }))
    );
  }
}
