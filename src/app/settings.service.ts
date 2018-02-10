import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SettingsService {

  mode: string;
  visible: boolean;
  hidden: boolean; // hidden from window (negative position)
  showTime: number;
  aboutVisible: boolean;

  modeChange: Subject<string> = new Subject<string>();

  constructor() {
    this.modeChange.subscribe((value) => {
       this.mode = value
    });
    this.setGrid()
    this.show()
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

  hide() {
    this.hidden = true;
  }

  clickOnAbout() {
    this.aboutVisible = !this.aboutVisible;
  }

  hideAbout() {
    this.aboutVisible = false;
  }

  show() {
    this.hidden = false;
    this.visible = true;
    this.showTime = new Date().getTime();
    var timeout = 5000;
    setTimeout(function() {
      if (new Date().getTime() - this.showTime >= timeout) {
        this.visible = false;
      }
    }.bind(this), timeout);
  }
}
