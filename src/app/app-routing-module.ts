import { ChallengeModule } from './features/challenge/challenge-module';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'challenges',
    loadChildren: () => import('./features/challenge/challenge-module').then(m => m.ChallengeModule)
  },
    {
    path: 'leader-board',
    loadChildren: () => import('./features/leader-board/leader-board-module').then(m => m.LeaderBoardModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
