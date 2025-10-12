import { ChallengeModule } from './features/challenge/challenge-module';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'challenges',
    loadChildren: () => import('./features/challenge/challenge-module').then(m => m.ChallengeModule)
  }
];

// function handleError(error: any) {
//   console.error('Error loading module:', error);
//   return {
//     class: 'StubModule',
//     factory: () => ({
//       component:
//     })
//   };
// }

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
