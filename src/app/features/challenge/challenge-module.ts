import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallengeState } from './state/challenge.state';
import { NgxsModule } from '@ngxs/store';
import { ChallengeApiService } from './services/challenge-api-service';
import { ChallengesList } from './components/challenges-list/challenges-list';



@NgModule({
  declarations: [
    ChallengesList
  ],
  imports: [
    CommonModule,
    NgxsModule.forFeature([ChallengeState])
  ],
  providers: [
    ChallengeApiService
  ]
})
export class ChallengeModule { }
