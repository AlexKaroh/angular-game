import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit  {
  @ViewChildren('square') square: QueryList<ElementRef> | undefined;

  title = '5x5';

  field = [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
  ];

  constructor() {}

  getPosition(event: EventTarget| null) {
    const elementsArr = this.square?.toArray().map(el => el.nativeElement);
    const clickedIndex = elementsArr!.indexOf(event);
    const rowSize = 5;
    let col = clickedIndex % rowSize;
    let row = Math.floor(clickedIndex / rowSize);
    console.log(`row: ${++row}, col: ${++col}`);
  }

  ngOnInit(): void {}

}
