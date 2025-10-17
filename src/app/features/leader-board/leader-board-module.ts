import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaderboardPageContainer } from '@features/leader-board/containers/leaderboard-page.container/leaderboard-page.container';
import { LeaderboardList } from '@features/leader-board/components/leaderboard-list/leaderboard-list';
import { LeaderboardItem } from '@features/leader-board/components/leaderboard-item/leaderboard-item';
import { LeaderBoardRoutingModule } from './leader-board-routing.module';
import { LeaderboardApiService } from '@features/leader-board/services/leaderboard-api-service';
import { MaterialModule } from '@app/app/material/material-module';
import { SharedModule } from '@app/app/shared/shared-module';
import { NgxsModule } from '@ngxs/store';
import { LeadersBoardState } from '@features/leader-board/state/leader-board.state';

@NgModule({
  declarations: [
    LeaderboardPageContainer,
    LeaderboardList,
    LeaderboardItem
  ],
  imports: [
    CommonModule,
    LeaderBoardRoutingModule,
    MaterialModule,
    SharedModule,
    NgxsModule.forFeature([LeadersBoardState])
  ],
  exports:[
    LeaderboardPageContainer
  ],
  providers: [
    LeaderboardApiService
  ]
})
export class LeaderBoardModule { }
