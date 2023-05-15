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
    const rowSize = 5;
    let col = clickedIndex % rowSize;
    let row = Math.floor(clickedIndex / rowSize);
    this.field[clickedIndex] = 1;
    console.log(`row: ${++row}, col: ${++col}`);
    console.log(this.field);
  }

  ngOnInit(): void {}

}
