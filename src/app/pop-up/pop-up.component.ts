import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

import { PopupState } from 'src/enums/PopupState';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopUpComponent implements OnChanges {
  @Input() popup?: number;
  @Output() close = new EventEmitter<void>();
  @Output() restart = new EventEmitter<void>();
  title?: string;
  content?: string;
  classImage?: string;

  ngOnChanges() {
    this.getTitle();
    this.getText();
    this.getClass();
    this.isPopupStateRestarted();
  }

  getTitle() {
    if (this.popup === PopupState.restart) {
      this.title = 'RESTART';
    } else this.title = this.popup === PopupState.win ? 'CONGRATS!' : 'SORRY!';
  }

  getText() {
    if (this.popup === PopupState.restart) {
      this.content = 'Are you sure?';
    } else this.content = this.popup === PopupState.win ? 'You are WINNER!' : 'You lose!';
  }

  getClass() {
    if (this.popup === PopupState.restart) {
      this.classImage = 'restart';
    } else this.classImage = this.popup === PopupState.win ? 'winner' : 'loser';
  }

  isPopupStateRestarted() {
    return this.popup === PopupState.restart;
  }

  closeWindow() {
    this.close.emit();
  };

  restartWindow() {
    this.restart.emit();
  }
}