import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ChallengeModel } from '@features/challenge/state/challenge.model';

@Component({
  selector: 'app-challenges-list',
  standalone: false,
  templateUrl: './challenges-list.html',
  styleUrl: './challenges-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChallengesList {
  
  pageSize = 10;
  pageSizeOptions = [10, 50, 100];
  displayedColumns = ['user', 'factorA', 'factorB', 'result', 'correct', 'actions'];
  
  @Input() attempts: ChallengeModel [] = [];
  @Input() loading = false;
  @Output() rowClicked = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  onRowClicked = (row: ChallengeModel) => this.rowClicked.emit(row.id);

  onDeleteRow = (evt: MouseEvent, row: ChallengeModel) => this.delete.emit(row.id);
}
