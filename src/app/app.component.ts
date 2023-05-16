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
    const elementsArr = this.square?.toArray().map(el => el.nativeElement);
    const clickedIndex = elementsArr!.indexOf(event);
    this.field[clickedIndex] = 1;
    const possibleMoves = this.getPossibleMoves(clickedIndex);

    possibleMoves.forEach(index => {
      if (this.field[index] === 0) {
        this.field[index] = 2;
      }
    });
  }

  getPossibleMoves(index: number): number[] {
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
    return possibleMoves;
  }

  ngOnInit(): void {}

}
