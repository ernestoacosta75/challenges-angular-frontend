import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChallengePageContainer } from './containers/challenge-page.container/challenge-page.container';

const routes: Routes = [
  {
    path: '',
    component: ChallengePageContainer,
    children: [
      { path: '', component: ChallengePageContainer }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChallengeRoutingModule { }