import { LeaderboardApiService } from '@features/leader-board/services/leaderboard-api-service';
import { Injectable } from '@angular/core';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { GetLeadersBoard } from './leader-board.actions';
import { LeaderBoardRowModel, LeaderBoardStateModel } from './leader-board.model';
import { of } from 'rxjs';
import { switchMap, tap, catchError, finalize } from 'rxjs/operators';
import * as R from 'ramda';
import { AppState } from '@app/app/state/app.state';

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
    private store: Store
  ) {}

  @Action(GetLeadersBoard)
  getLeadersBoard(ctx: StateContext<LeaderBoardStateModel>, action: GetLeadersBoard) {
    ctx.patchState({ loading: true, error: null });

    return this.leaderboardApiService.getLeadersBoard().pipe(
      switchMap((rows: LeaderBoardRowModel[] | undefined) => {
        const rowsArr: LeaderBoardRowModel[] = R.defaultTo([], rows); 
        /**
        const userIds: string[] = Array.from(
          new Set(
            rowsArr
              .map((r) => r.userId)
              .filter(id => id !== null && id !== undefined && id !== '')
              .map(String)
          )
        );

        const uniqueUserIds = Array.from(new Set(userIds));
        */

        const uniqueUserIds: string[] = R.pipe(
          R.map((r: LeaderBoardRowModel) => r.userId),    // 1. Get the 'userId' from each row
          R.filter(Boolean),                              // 2. Filter out all falsy values (null, undefined, empty string)
          R.map(String),                                  // 3. Ensure all remaining IDs are strings
          R.uniq                                          // 4. Deduplicate the list
        ) (rowsArr) as string[];

        if (uniqueUserIds.length === 0) {
          return of(R.map((r: LeaderBoardRowModel) => ({ ...r, userAlias: 'Unknown'}), rowsArr));
        }

        // TODO: I have already all the users in the AppState. Get their alias from there instead of making another API call.
        const usersSnapshot: any [] = this.store.selectSnapshot((state: AppState) => {
          return R.pathOr([], ['appState', 'users'], state);
        });

        const usersByIdSnapshot = R.indexBy((u: any) => String(u.id ?? u.userId ?? u.userID), usersSnapshot);
        const missingIds = uniqueUserIds.filter(id => !Object.prototype.hasOwnProperty.call(usersByIdSnapshot, String(id)));

        if (missingIds.length === 0) {
          // all found in snapshot — enrich and return synchronously
          const enriched = R.map((row: LeaderBoardRowModel) => {
            const u = usersByIdSnapshot[String(row.userId)];
            return { ...row, userAlias: u?.alias ?? u?.name ?? 'Unknown' };
          }, rowsArr) as LeaderBoardRowModel[];

          return of(enriched);
        }
        
        // Return empty array if no other conditions are met
        return of([] as LeaderBoardRowModel[]);        
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
