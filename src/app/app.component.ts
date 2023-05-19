import { ChangeDetectionStrategy, Component } from '@angular/core';

enum CellState {
  'empty',
  'active',
  'available',
  'visited',
}

export enum PopupState {
  'disabled',
  'win',
  'lose',
  'restart'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = '5x5'
  cells: number[] = Array(25).fill(CellState.empty);
  moveCounts: number[] = Array(25).fill(0);
  moveHistory: number[] = [];
  popupState = PopupState.disabled;
  isFieldSizeSmall = true;

  makeMove(clickedIndex: number): void {
    if(this.moveHistory.length === 0 || this.cells[clickedIndex] === CellState.available) {
      this.clearUnusedCells();
      this.cells[clickedIndex] = CellState.active;
      this.getPossibleMoves(clickedIndex);
      this.incrementCounter(clickedIndex);
      this.moveHistory.push(clickedIndex);
      this.checkGameState();
    }
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
      if (this.cells[index] === CellState.empty) {
        this.cells[index] = CellState.available;
      }
    });
  }

  checkGameState() {
    if (this.moveHistory.length === this.cells.length){
      this.popupState = PopupState.win;
    } else if (!this.cells.some(el => el === CellState.available)) {
      this.popupState = PopupState.lose;
    }
  }

  stepBack() {
    if (this.moveHistory.length > 0) {
      let lastIndex = this.moveHistory[this.moveHistory.length - 1];
      this.moveCounts[lastIndex] = CellState.empty;
      this.moveHistory.pop();
      this.clearUnusedCellsBack();
      lastIndex = this.moveHistory[this.moveHistory.length - 1];
      this.cells[lastIndex] = CellState.active;
      this.getPossibleMoves(lastIndex);
    }
  }

  getMoveCount() {
    return this.moveHistory.length + 1;
  }

  incrementCounter(clickedIndex: number) {
    if (this.moveCounts[clickedIndex] === CellState.empty) {
      this.moveCounts[clickedIndex] = this.getMoveCount();
    }
  }

  clearUnusedCells() {
    for (let i = 0; i < this.cells.length; i++){
      if(this.cells[i] === CellState.available) this.cells[i] = CellState.empty;
      if(this.cells[i] === CellState.active) this.cells[i] = CellState.visited;
    }
  }

  clearUnusedCellsBack() {
    for (let i = 0; i < this.cells.length; i++){
      if(this.cells[i] === CellState.available) this.cells[i] = CellState.empty;
      if(this.cells[i] === CellState.active) this.cells[i] = CellState.empty;
    }
  }

  restartGame() {
    this.cells.fill(CellState.empty);
    this.moveCounts.fill(0);
    this.moveHistory = [];
    this.popupState = PopupState.disabled;
  }

  closePopUp() {
    this.popupState = PopupState.disabled;
  }

  restartPopUp() {
    this.popupState = PopupState.restart
  }

  isCellVisitedAndActive(cell: number) {
    return cell > CellState.empty && cell !== CellState.available;
  }

  swapSize() {
    this.isFieldSizeSmall = !this.isFieldSizeSmall;
    if(this.isFieldSizeSmall) {
      this.cells = Array(25);
      this.moveCounts = Array(25);
    } else {
      this.cells = Array(81);
      this.moveCounts = Array(81);
    }
    this.restartGame();
  }

  getDotClass(cell: number): string {
    switch (cell) {
      case CellState.active:
        return 'active';
      case CellState.available:
        return 'available';
      case CellState.visited:
        return 'visited'
      default:
        return 'empty';
    }
  }

  getCellSize(cell: number): string {
    if (cell === CellState.available) {
      return (this.isFieldSizeSmall ? 'large posible' : 'small posible');
    } return (this.isFieldSizeSmall ? 'large' : 'small');
  }
}
