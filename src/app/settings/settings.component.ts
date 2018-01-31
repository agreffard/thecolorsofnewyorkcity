import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  mode: string;

  constructor(private settingsService: SettingsService) {
  	this.mode = settingsService.mode;
  }

  ngOnInit() {
  }
}
