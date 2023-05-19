import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PopupState } from 'src/enums/PopupState';

enum CellState {
  'empty',
  'active',
  'available',
  'visited',
}
type CellType = 0 | 1 | 2 | 3;
type CountsType = number;
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
  cells: CellType[] = Array(25).fill(CellState.available);
  moveCounts: CountsType[] = Array(25).fill(DEFAULT_VALUE);
  moveHistory: number[] = [];
  popupState = PopupState.disabled;
  isFieldSizeSmall = true;

  makeMove(clickedIndex: number): void {
    if(this.cells[clickedIndex] === CellState.available) {
      this.clearUnusedCells();
      this.cells[clickedIndex] = CellState.active;
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
            if (this.cells[possibleMove] === CellState.empty) {
              this.cells[possibleMove] = CellState.available;
            }
          }
        }
      }
    }
  }

  checkGameState() {
    if (this.moveHistory.length === this.cells.length){
      this.popupState = PopupState.win;
    } else if (!this.cells.some(el => el === CellState.available)) {
      this.popupState = PopupState.lose;
    }
  }

  stepBack() {
    if (this.moveHistory.length > DEFAULT_VALUE) {
      let lastIndex = this.moveHistory[this.moveHistory.length - 1];
      this.moveCounts[lastIndex] = CellState.empty;
      this.moveHistory.pop();
      this.clearUnusedCellsBack();
      lastIndex = this.moveHistory[this.moveHistory.length - 1];
      this.cells[lastIndex] = CellState.active;
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
      if(this.cells[i] === CellState.available) {
        this.cells[i] = CellState.empty;
      }
      else if (this.cells[i] === CellState.active) {
      this.cells[i] = CellState.visited;
      }
    }
  }

  clearUnusedCellsBack() {
    for (let i = 0; i < this.cells.length; i++){
      if(this.cells[i] === CellState.available) {
        this.cells[i] = CellState.empty;
      }
      else if(this.cells[i] === CellState.active) {
        this.cells[i] = CellState.empty;
      }
    }
  }

  restartGame() {
    this.cells.fill(CellState.available);
    this.moveCounts.fill(DEFAULT_VALUE);
    this.moveHistory = [];
    this.popupState = PopupState.disabled;
  }

  closePopUp() {
    this.popupState = PopupState.disabled;
  }

  restartPopUp() {
    this.popupState = PopupState.restart;
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
        return 'visited';
      default:
        return 'empty';
    }
  }

  getCellSize(cell: number): string {
    let size = this.isFieldSizeSmall ? 'large' : 'small';
    if (cell === CellState.available) {
      size += ' possible';
    }
    return size;
  }
}
