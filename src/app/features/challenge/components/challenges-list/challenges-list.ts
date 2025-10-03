import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChallengeModel } from '../../state/challenge.model';
import { Store } from '@ngxs/store';
import { ChallengeStateSelectors } from '../../state/challenge.selectors';

@Component({
  selector: 'app-challenges-list',
  standalone: false,
  templateUrl: './challenges-list.html',
  styleUrl: './challenges-list.css'
})
export class ChallengesList implements OnInit{
  challenges$!: Observable<ChallengeModel[]>;

  constructor(private store: Store) {}
  
  ngOnInit(): void {
    this.challenges$ = this.store.select(ChallengeStateSelectors.getChallenges);
  }
}
