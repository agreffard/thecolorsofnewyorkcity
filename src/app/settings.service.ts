import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SettingsService {

  mode: string;

  modeChange: Subject<string> = new Subject<string>();

  constructor() {
    this.modeChange.subscribe((value) => {
       this.mode = value
    });
    this.setHorizontal()
  }

  setVertical() {
    this.modeChange.next("vertical");
  }

  setHorizontal() {
    this.modeChange.next("horizontal");
  }

  setGrid() {
    this.modeChange.next("grid");
  }

  setCircles() {
    this.modeChange.next("circles");
  }

  setPreview() {
    this.modeChange.next("preview");
  }

}
