import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallengeState } from './state/challenge.state';
import { NgxsModule } from '@ngxs/store';
import { ChallengeApiService } from '@features/challenge/services/challenge-api-service';
import { ChallengesList } from '@features/challenge/components/challenges-list/challenges-list';
import { ChallengeManagement } from '@features/challenge/components/challenge-management/challenge-management';
import { MaterialModule } from '@material/material-module';
import { ChallengePageContainer } from './containers/challenge-page.container/challenge-page.container';

@NgModule({
  declarations: [
    ChallengesList,
    ChallengeManagement,
    ChallengePageContainer
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgxsModule.forFeature([ChallengeState])
  ],
  providers: [
    ChallengeApiService
  ]
})
export class ChallengeModule { }
