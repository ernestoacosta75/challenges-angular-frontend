import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaderboardPageContainer } from './containers/leaderboard-page.container/leaderboard-page.container';

const routes: Routes = [
  {
    path: '',
    component: LeaderboardPageContainer,
    children: [
      { path: '', component: LeaderboardPageContainer }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaderBoardRoutingModule { }