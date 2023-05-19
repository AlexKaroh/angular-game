import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { PopupState } from '../app.component';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopUpComponent {
  @Input() popup?: number;
  @Output() close = new EventEmitter<void>();
  @Output() restart = new EventEmitter<void>();

  getTitle(): string {
    if (this.popup === PopupState.restart) {
      return 'RESTART'
    } return this.popup === PopupState.win ? 'CONGRATS!' : 'SORRY!';
  }

  getText(): string {
    if (this.popup === PopupState.restart) {
      return 'Are you sure?'
    } return this.popup === PopupState.win ? 'You are WINNER!' : 'You lose!';
  }

  getClass(): string {
    if (this.popup === PopupState.restart) {
      return 'restart'
    } return this.popup === PopupState.win ? 'winner' : 'loser';
  }

  getButtons() {
    return this.popup === PopupState.restart;
  }

  closeWindow() {
    this.close.emit();
  };

  restartWindow() {
    this.restart.emit();
  }
}