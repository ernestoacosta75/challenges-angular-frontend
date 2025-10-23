import { Component, OnInit } from '@angular/core';
import { LeaderBoardRowModel } from '@features/leader-board/state/leader-board.model';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { GetLeadersBoard } from '@features/leader-board/state/leader-board.actions';
import { LeadersBoardStateSelectors } from '@features/leader-board/state/leader-board.selectors';
import { GetAllUsers } from '@app/app/state/app.actions';

@Component({
  selector: 'app-leaderboard-page.container',
  standalone: false,
  templateUrl: './leaderboard-page.container.html',
  styleUrl: './leaderboard-page.container.css'
})
export class LeaderboardPageContainer implements OnInit {
  leadersBoard$!: Observable<LeaderBoardRowModel[]>;
  loading$!: Observable<boolean>;

  constructor(private store: Store) {
    this.store.dispatch(new GetAllUsers());
    this.store.dispatch(new GetLeadersBoard());
  }

  ngOnInit(): void {
    this.leadersBoard$ = this.store.select(LeadersBoardStateSelectors.getLeadersBoard);
    this.loading$ = this.store.select(LeadersBoardStateSelectors.loading);
  }
}
