import { Component, OnInit } from '@angular/core';
import { LeaderBoardRowModel } from '@features/leader-board/state/leader-board.model';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { GetLeadersBoard } from '@features/leader-board/state/leader-board.actions';
import { LeadersBoardStateSelectors } from '@features/leader-board/state/leader-board.selectors';

@Component({
  selector: 'app-leaderboard-page.container',
  standalone: false,
  templateUrl: './leaderboard-page.container.html',
  styleUrl: './leaderboard-page.container.css'
})
export class LeaderboardPageContainer implements OnInit {
  leadersBoard$!: Observable<LeaderBoardRowModel[]>;
  loading$!: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new GetLeadersBoard());

    this.leadersBoard$ = this.store.select(LeadersBoardStateSelectors.getLeadersBoard);
    this.loading$ = this.store.select(LeadersBoardStateSelectors.loading);
  }
}
