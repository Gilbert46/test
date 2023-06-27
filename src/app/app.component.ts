import { Component, OnInit } from '@angular/core';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
//import { readFileSync } from 'fs';
//import { parse } from 'querystring';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() {}
  hidden: boolean = false
  time: boolean[] = [true, true, true, true, true]

  ngOnInit(): void {
    this.startApp()
  }

  startApp(): void {
    setTimeout(() => {
      if (!this.time[4]) {
        this.hidden = true;
      }
      else if (!this. time[3]) {
        this.time[4] = false
        this.startApp()
      }
      else if (!this.time[2]) {
        this.time[3] = false
        this.startApp()
      }
      else if (!this. time[1]) {
        this.time[2] = false
        this.startApp()
      }
      else if (!this.time[0]) {
        this.time[1] = false
        this.startApp()
      }
      else {
        this.time[0] = false;
        this.startApp()
      }
    }, 500);

  }
  /*
  insertRegistred() {
    const fileContent = readFileSync('../assets/puzzles.csv', 'utf-8');
    const csvContent = parse(fileContent)
    console.log(csvContent)
  }*/
}
