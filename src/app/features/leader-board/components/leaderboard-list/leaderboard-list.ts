import { Component, Input } from '@angular/core';
import { LeaderBoardStateModel, LeaderBoardRowModel } from '@features/leader-board/state/leader-board.model';

@Component({
  selector: 'app-leaderboard-list',
  standalone: false,
  templateUrl: './leaderboard-list.html',
  styleUrl: './leaderboard-list.css'
})
export class LeaderboardList {
  @Input() leadersBoard: LeaderBoardRowModel [] = [];
  @Input() loading = false;
  
  pageSize = 10;
  pageSizeOptions = [10, 50, 100];
  displayedColumns = ['user', 'score', 'badges'];

}
