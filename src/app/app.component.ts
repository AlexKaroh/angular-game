import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit  {
  @ViewChildren('square') square: QueryList<ElementRef> | undefined;
  title = '5x5';
  field = Array(25).fill(0);


  constructor() {}

  getPosition(event: EventTarget| null) {
    this.clearUnusedCells();
    const elementsArr = this.square?.toArray().map(el => el.nativeElement);
    const clickedIndex = elementsArr!.indexOf(event);
    this.getPossibleMoves(clickedIndex);
    this.field[clickedIndex] = 1;
  }

  clearUnusedCells(): void {
    for (let i = 0; i < this.field.length; i++){
      if(this.field[i] === 2) this.field[i] = 0
    }
  }

  getPossibleMoves(index: number): void {
    const rowSize = 5;
    const row = Math.floor(index / rowSize);
    const col = index % rowSize;
    const possibleMoves = [];
    const horseRange = [-2, -1, 1, 2];

    for (let x of horseRange) {
      for (let y of horseRange) {
        if (Math.abs(x) !== Math.abs(y)) {
          const possibleRow = row + y;
          const possibleColunm = col + x;
          if (possibleRow >= 0 && possibleRow < rowSize && possibleColunm >= 0 && possibleColunm < rowSize) {
            possibleMoves.push(possibleRow * rowSize + possibleColunm);
          }
        }
      }
    }

    possibleMoves.forEach(index => {
      if (this.field[index] === 0) {
        this.field[index] = 2;
      }
    });
  }

  ngOnInit(): void {}

}
