import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopUpComponent {
  @Input() popUpState?: string | boolean;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Output() restart: EventEmitter<void> = new EventEmitter<void>();

  getTitle(): string {
    if (this.popUpState === 'restart') {
      return 'RESTART'
    } return this.popUpState === 'win' ? 'CONGRATS!' : 'SORRY!';
  }

  getText(): string {
    if (this.popUpState === 'restart') {
      return 'Are you sure?'
    } return this.popUpState === 'win' ? 'You are WINNER!' : 'You lose!';
  }

  getClass(): string {
    if (this.popUpState === 'restart') {
      return 'restart'
    } return this.popUpState === 'win' ? 'winner' : 'loser';
  }

  closeWindow() {
    this.close.emit();
  };

  restartWindow() {
    this.restart.emit();
  }
}