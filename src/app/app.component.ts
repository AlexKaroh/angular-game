import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit  {
  @ViewChildren('square') square: QueryList<ElementRef> | undefined;
  title = '5x5';
  field = Array(25).fill(0);
  isFirstMove = true;


  constructor() {}

  restartGame() {
    this.field = Array(25).fill(0);
    this.isFirstMove = true;
  }

  getPosition(event: EventTarget| null) {
    const elementsArr = this.square!.toArray().map(el => el.nativeElement);
    const clickedIndex = elementsArr.indexOf(event);

    if(this.isFirstMove === true && this.field[clickedIndex] === 0) {
      this.confirmMove(clickedIndex);
      this.isFirstMove = false;
    }

    if(this.isFirstMove === false && this.field[clickedIndex] === 2) {
      this.confirmMove(clickedIndex);
    }
  }

  clearUnusedCells() {
    for (let i = 0; i < this.field.length; i++){
      if(this.field[i] === 2) this.field[i] = 0;
      if(this.field[i] === 1) this.field[i] = 3;
    }
  }

  getPossibleMoves(index: number) {
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

  confirmMove(clickedIndex: number) {
    this.clearUnusedCells();
    this.getPossibleMoves(clickedIndex);
    this.field[clickedIndex] = 1;
  }

  getCellClass(cell: number): string {
    switch (cell) {
      case 1:
        return 'active';
      case 2:
        return 'possible';
      case 3:
        return 'inactive'
      default:
        return 'empty';
    }
  }

  ngOnInit(): void {}

}
