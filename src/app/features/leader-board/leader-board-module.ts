import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaderboardPageContainer } from './containers/leaderboard-page.container/leaderboard-page.container';
import { LeaderboardList } from './components/leaderboard-list/leaderboard-list';
import { LeaderboardItem } from './components/leaderboard-item/leaderboard-item';



@NgModule({
  declarations: [
    LeaderboardPageContainer,
    LeaderboardList,
    LeaderboardItem
  ],
  imports: [
    CommonModule
  ]
})
export class LeaderBoardModule { }
