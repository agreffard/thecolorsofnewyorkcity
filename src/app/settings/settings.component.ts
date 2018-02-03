import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SettingsService } from '../settings.service';
import { trigger, state, transition, style, animate } from '@angular/animations'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  animations: [
    trigger('visibilityChanged', [
      state('true', style({ opacity: 1 })),
      state('false', style({ opacity: 0 })),
      transition('* => *', animate('500ms'))
    ])
  ]
})
export class SettingsComponent implements OnInit {

  mode: string;
  focus: boolean;

  constructor(private settingsService: SettingsService) {
    this.mode = settingsService.mode;
    this.focus = false;
  }

  ngOnInit() {
  }
}
