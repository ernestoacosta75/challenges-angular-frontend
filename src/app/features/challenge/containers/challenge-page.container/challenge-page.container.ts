import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, startWith, tap } from 'rxjs';
import { ChallengeModel } from '@features/challenge/state/challenge.model';
import { GetChallenge, GetChallenges, SendGuess } from '@features/challenge/state/challenge.actions';
import { ChallengeStateSelectors } from '@features/challenge/state/challenge.selectors';

@Component({
  selector: 'app-challenge-page.container',
  standalone: false,
  templateUrl: './challenge-page.container.html',
  styleUrl: './challenge-page.container.css'
})
export class ChallengePageContainer implements OnInit {
  currentChallenge$!: Observable<ChallengeModel>;
  challenges$!: Observable<ChallengeModel[]>;
  loading$!: Observable<boolean>;
  counts$!: Observable<{ all: number; resolved: number; failed: number }>;

  editing?: Partial<ChallengeModel> | null = null;

  constructor(private store: Store) {

  }

  ngOnInit(): void {
    this.store.dispatch(new GetChallenge());
    this.store.dispatch(new GetChallenges());

    this.challenges$ = this.store.select(ChallengeStateSelectors.filteredChallenges);

    this.currentChallenge$ = this.store.select(ChallengeStateSelectors.getChallenge)
    .pipe(
      tap(ch => this.editing = ch)
    );

    this.loading$ = this.store.select(ChallengeStateSelectors.loading);
    
    this.counts$ = this.store.select(ChallengeStateSelectors.counts)
    .pipe(
      startWith({ all: 0, resolved: 0, failed: 0})
    );
  }
   
  onSend = () => {}

  onRowClick = (id: string) => {
    const challenge = this.store.selectSnapshot(state => state.challenges.items.find((ch: any) => ch.id === id));
    this.editing = challenge ? { ...challenge } : null;
  }

  onDelete = (id: string) => {}

  onSave = (payload: any) => {
    this.store.dispatch(new SendGuess(payload));
    this.editing = null;
  }

  onCancel = () => this.editing = null;
}
