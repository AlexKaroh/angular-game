import { ChangeDetectionStrategy, Component } from '@angular/core';

enum cellState {
  'empty',
  'active',
  'available',
  'visited',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent {
  title = '5x5'
  cells: number[] = Array(25).fill(cellState.empty);
  moveCounts: number[] = Array(25).fill(0);
  moveHistory: number[] = [];
  moveCount = 0;
  popUpState: string | boolean  = false;
  isFieldSizeSmall = true;

  makeMove(clickedIndex: number): void {
    if(this.moveHistory.length === 0 || this.cells[clickedIndex] === cellState.available) {
      this.confirmMove(clickedIndex);
    }
  }

  confirmMove(clickedIndex: number) {
    this.clearUnusedCells();
    this.getPossibleMoves(clickedIndex);
    this.incrementCounter(clickedIndex);
    this.cells[clickedIndex] = cellState.active;
    this.checkGameState();
    this.moveHistory.push(clickedIndex);
  }

  getPossibleMoves(index: number) {
    const rowSize = Math.sqrt(this.cells.length);
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
      if (this.cells[index] === cellState.empty) {
        this.cells[index] = cellState.available;
      }
    });
  }

  clearUnusedCells() {
    for (let i = 0; i < this.cells.length; i++){
      if(this.cells[i] === cellState.available) this.cells[i] = cellState.empty;
      if(this.cells[i] === cellState.active) this.cells[i] = cellState.visited;
    }
  }

  checkGameState() {
    if(!this.cells.some(el => el === cellState.available)) {
      this.popUpState = 'lose';
    }
    if(this.moveHistory.length === this.cells.length - 1){
      this.popUpState = 'win';
    }
  }

  moveBack() {
    console.log(this.moveHistory.length);
    if (this.moveHistory.length >= 0) {
      let lastIndex = this.moveHistory[this.moveHistory.length - 1];
      this.moveHistory.pop();
      this.clearUnusedCellsBack();
      lastIndex = this.moveHistory[this.moveHistory.length - 1];
      this.moveCount--;
      this.cells[lastIndex] = cellState.active;
      this.getPossibleMoves(lastIndex);
    }
  }

  incrementCounter(clickedIndex: number) {
    if (this.moveCounts[clickedIndex] === cellState.empty) {
      this.moveCounts[clickedIndex] = this.moveCount + 1;
    }
    this.moveCount++;
  }

  clearUnusedCellsBack() {
    for (let i = 0; i < this.cells.length; i++){
      if(this.cells[i] === cellState.available) this.cells[i] = cellState.empty;
      if(this.cells[i] === cellState.active) this.cells[i] = cellState.empty;
    }
  }

  restartGame() {
    this.cells.fill(cellState.empty);
    this.moveCount = 0;
    this.moveCounts.fill(0);
    this.moveHistory = [];
    this.popUpState = false;
  }

  getSize() {
    const smallField = Array(25);
    const largeField = Array(81);

    if(!this.isFieldSizeSmall) {
      this.cells = smallField;
      this.moveCounts = smallField;
    } else {
      this.cells = largeField;
      this.moveCounts = largeField;
    }
  
    this.restartGame();
    this.isFieldSizeSmall = !this.isFieldSizeSmall
  }

  getDotClass(cell: number): string {
    switch (cell) {
      case cellState.active:
        return 'active';
      case cellState.available:
        return 'available';
      case cellState.visited:
        return 'visited'
      default:
        return 'empty';
    }
  }

  getCellSize(cell: number): string {
    if (cell === cellState.available) {
      return (this.isFieldSizeSmall ? 'large posible' : 'small posible');
    } return (this.isFieldSizeSmall ? 'large' : 'small');
  }
}
