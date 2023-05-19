import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PopupState } from 'src/enums/PopupState';

enum CellState {
  EMPTY,
  ACTIVE,
  AVAILABLE,
  VISITED,
}
type CellType = typeof CellState[keyof typeof CellState];
const DEFAULT_VALUE = 0;
const HORSE_RANGE = [-2, -1, 1, 2];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = '5x5'
  cells: CellType[] = Array(25).fill(CellState.AVAILABLE);
  moveCounts: number[] = Array(25).fill(DEFAULT_VALUE);
  moveHistory: number[] = [];
  popupState = PopupState.DISABLED;
  isFieldSizeSmall = true;

  makeMove(clickedIndex: number): void {
    if(this.cells[clickedIndex] === CellState.AVAILABLE) {
      this.clearUnusedCells();
      this.cells[clickedIndex] = CellState.ACTIVE;
      this.setPossibleMoves(clickedIndex);
      this.incrementCounter(clickedIndex);
      this.moveHistory.push(clickedIndex);
      this.checkGameState();
    }
  }

  setPossibleMoves(index: number) {
    const rowSize = Math.sqrt(this.cells.length);
    const row = Math.floor(index / rowSize);
    const col = index % rowSize;

    for (let x of HORSE_RANGE) {
      for (let y of HORSE_RANGE) {
        if (Math.abs(x) !== Math.abs(y)) {
          const possibleRow = row + y;
          const possibleColunm = col + x;
          if (possibleRow >= 0 && possibleRow < rowSize && possibleColunm >= 0 && possibleColunm < rowSize) {
            const possibleMove = possibleRow * rowSize + possibleColunm ;
            if (this.cells[possibleMove] === CellState.EMPTY) {
              this.cells[possibleMove] = CellState.AVAILABLE;
            }
          }
        }
      }
    }
  }

  checkGameState() {
    if (this.moveHistory.length === this.cells.length){
      this.popupState = PopupState.WIN;
    } else if (!this.cells.some(el => el === CellState.AVAILABLE)) {
      this.popupState = PopupState.LOSE;
    }
  }

  stepBack() {
    if (this.moveHistory.length > DEFAULT_VALUE) {
      let lastIndex = this.moveHistory[this.moveHistory.length - 1];
      this.moveCounts[lastIndex] = CellState.EMPTY;
      this.moveHistory.pop();
      this.clearUnusedCellsBack();
      lastIndex = this.moveHistory[this.moveHistory.length - 1];
      this.cells[lastIndex] = CellState.ACTIVE;
      this.setPossibleMoves(lastIndex);
    }
  }

  getMoveCount() {
    return this.moveHistory.length + 1;
  }

  incrementCounter(clickedIndex: number) {
    if (this.moveCounts[clickedIndex] === DEFAULT_VALUE) {
      this.moveCounts[clickedIndex] = this.getMoveCount();
    }
  }

  clearUnusedCells() {
    for (let i = 0; i < this.cells.length; i++){
      if(this.cells[i] === CellState.AVAILABLE) {
        this.cells[i] = CellState.EMPTY;
      }
      else if (this.cells[i] === CellState.ACTIVE) {
      this.cells[i] = CellState.VISITED;
      }
    }
  }

  clearUnusedCellsBack() {
    for (let i = 0; i < this.cells.length; i++){
      if(this.cells[i] === CellState.AVAILABLE) {
        this.cells[i] = CellState.EMPTY;
      }
      else if(this.cells[i] === CellState.ACTIVE) {
        this.cells[i] = CellState.EMPTY;
      }
    }
  }

  restartGame() {
    this.cells.fill(CellState.AVAILABLE);
    this.moveCounts.fill(DEFAULT_VALUE);
    this.moveHistory = [];
    this.popupState = PopupState.DISABLED;
  }

  closePopUp() {
    this.popupState = PopupState.DISABLED;
  }

  restartPopUp() {
    this.popupState = PopupState.RESTART;
  }

  isCellVisitedAndActive(cell: number) {
    return cell > CellState.EMPTY && cell !== CellState.AVAILABLE;
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
      case CellState.ACTIVE:
        return 'active';
      case CellState.AVAILABLE:
        return 'available';
      case CellState.VISITED:
        return 'visited';
      default:
        return 'empty';
    }
  }

  getCellSize(cell: number): string {
    let size = this.isFieldSizeSmall ? 'large' : 'small';
    if (cell === CellState.AVAILABLE) {
      size += ' possible';
    }
    return size;
  }
}
