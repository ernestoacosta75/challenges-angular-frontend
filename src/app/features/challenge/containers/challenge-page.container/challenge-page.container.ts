import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ChallengeModel } from '../../state/challenge.model';
import { GetChallenge, GetChallenges } from '../../state/challenge.actions';
import { ChallengeStateSelectors } from '../../state/challenge.selectors';

@Component({
  selector: 'app-challenge-page.container',
  standalone: false,
  templateUrl: './challenge-page.container.html',
  styleUrl: './challenge-page.container.css'
})
export class ChallengePageContainer {
  currentChallenge$: Observable<ChallengeModel>;
  challenges$: Observable<ChallengeModel[]>;
  loading$: Observable<boolean>;
  counts$: Observable<{ all: number; resolved: number; failed: number }>;

  constructor(private store: Store) {
    this.store.dispatch(new GetChallenge());
    this.store.dispatch(new GetChallenges());

    this.challenges$ = this.store.select(ChallengeStateSelectors.filteredChallenges);
    this.currentChallenge$ = this.store.select(ChallengeStateSelectors.getChallenge);
    this.loading$ = this.store.select(ChallengeStateSelectors.loading);
    this.counts$ = this.store.select(ChallengeStateSelectors.counts);
  }
}
