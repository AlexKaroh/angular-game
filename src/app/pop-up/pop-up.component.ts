import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { popUpState } from '../app.component';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopUpComponent {
  @Input() popUp?: number;
  @Output() close = new EventEmitter<void>();
  @Output() restart = new EventEmitter<void>();

  getTitle(): string {
    if (this.popUp === popUpState.restart) {
      return 'RESTART'
    } return this.popUp === popUpState.win ? 'CONGRATS!' : 'SORRY!';
  }

  getText(): string {
    if (this.popUp === popUpState.restart) {
      return 'Are you sure?'
    } return this.popUp === popUpState.win ? 'You are WINNER!' : 'You lose!';
  }

  getClass(): string {
    if (this.popUp === popUpState.restart) {
      return 'restart'
    } return this.popUp === popUpState.win ? 'winner' : 'loser';
  }

  getButtons() {
    return this.popUp === popUpState.restart;
  }

  closeWindow() {
    this.close.emit();
  };

  restartWindow() {
    this.restart.emit();
  }
}