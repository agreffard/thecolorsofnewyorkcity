import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SettingsService {

  mode: string;
  visible: boolean;

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
    setTimeout(function() {
      this.visible = false;
    }.bind(this), 2000);
  }

}
