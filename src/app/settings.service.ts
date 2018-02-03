import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SettingsService {

  mode: string;
  visible: boolean;
  showTime: integer;

  modeChange: Subject<string> = new Subject<string>();

  constructor() {
    this.modeChange.subscribe((value) => {
       this.mode = value
    });
    this.setHorizontal()
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

  show() {
    this.visible = true;
    this.showTime = new Date().getTime();
    var timeout = 1000;
    setTimeout(function() {
    if (new Date().getTime() - this.showTime >= timeout) {	
        this.visible = false;
      }
    }.bind(this), timeout);
  }
}
