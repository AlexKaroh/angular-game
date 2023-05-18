import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent {
  @Input() isWin!: boolean;
  @Input() isLose!: boolean;
  @Input() isRestart! : boolean;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Output() restart: EventEmitter<void> = new EventEmitter<void>();

  getTitle(): string {
    if (this.isRestart) {
      return 'RESTART'
    } return this.isWin ? 'CONGRATS!' : 'SORRY!';
  }

  getText(): string {
    if (this.isRestart) {
      return 'Are you sure?'
    } return this.isWin ? 'You are WINNER!' : 'You lose!';
  }

  getClass(): string {
    if (this.isRestart) {
      return 'restart'
    } return this.isWin ? 'winner' : 'loser';
  }

  closeWindow() {
    this.close.emit();
  };

  restartWindow() {
    this.restart.emit();
  }
}