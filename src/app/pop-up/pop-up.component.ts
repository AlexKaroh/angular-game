import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent {
  @Input() isWin!: boolean;
  @Input() isLose!: boolean;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Output() restart: EventEmitter<void> = new EventEmitter<void>();

  closeWindow() {
    this.close.emit();
  };

  restartWindow() {
    this.restart.emit();
  }
}