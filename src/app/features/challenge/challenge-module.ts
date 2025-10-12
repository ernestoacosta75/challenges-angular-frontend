import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallengeState } from '@features/challenge/state/challenge.state';
import { NgxsModule } from '@ngxs/store';
import { ChallengeApiService } from '@features/challenge/services/challenge-api-service';
import { ChallengesList } from '@features/challenge/components/challenges-list/challenges-list';
import { ChallengeManagement } from '@features/challenge/components/challenge-management/challenge-management';
import { MaterialModule } from '@material/material-module';
import { ChallengePageContainer } from '@features/challenge/containers/challenge-page.container/challenge-page.container';
import { ChallengeEditor } from './components/challenge-editor/challenge-editor';
import { SharedModule } from '@shared/shared-module';
import { ChallengeRoutingModule } from './challenge-routing.module';

@NgModule({
  declarations: [
    ChallengesList,
    ChallengeManagement,
    ChallengePageContainer,
    ChallengeEditor
  ],
  imports: [
    CommonModule,
    ChallengeRoutingModule,
    MaterialModule,
    SharedModule,
    NgxsModule.forFeature([ChallengeState])
  ],
  providers: [
    ChallengeApiService
  ]
})
export class ChallengeModule { }
