import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ChallengeModel } from '@features/challenge/state/challenge.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-challenge-editor',
  standalone: false,
  templateUrl: './challenge-editor.html',
  styleUrl: './challenge-editor.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChallengeEditor implements OnChanges {

  @Input() challenge?: Partial<ChallengeModel> | null;
  @Input() saving = false;
  @Output() save = new EventEmitter<Partial<ChallengeModel>>();
  @Output() cancel = new EventEmitter<void>();

  form = new FormGroup({
    id: new FormControl<string | null>(null),
    alias: new FormControl<string>('', { nonNullable: true, validators: [Validators.required]}),
    factorA: new FormControl<number>({ value: 0, disabled: true }),
    factorB: new FormControl<number>({ value: 0, disabled: true }),
    guess: new FormControl<number>(0, { nonNullable: true, validators: [Validators.required]}),
  });

  get guess() {
    return this.form.get('guess') as FormControl;
  }

  get alias() {
    return this.form.get('alias') as FormControl;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['challenge']) {
      this.resetForm(this.challenge);
    }
  }
  
  private resetForm = (challenge?: Partial<ChallengeModel> | null) => {
    this.form.setValue({
      id:challenge?.id ?? null,
      factorA: challenge?.factorA ?? 0,
      factorB: challenge?.factorB ?? 0,
      alias: challenge?.userAlias ?? '',
      guess: challenge?.guess ?? 0
    });

    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  onSubmit = () => {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();
    const payload: Partial<ChallengeModel> = {
      ...(raw.id ? { id: raw.id } : {}),
      factorA: raw.factorA || undefined,
      factorB: raw.factorB || undefined,
      userAlias: raw.alias,
      guess: raw.guess
    };

    this.save.emit(payload);
  }

  onCancel = () => this.cancel.emit();
}
