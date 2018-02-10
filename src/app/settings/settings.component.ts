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

  @Output() random = new EventEmitter<>();
  @Output() modeChanged = new EventEmitter<>();

  clickOnRandom() {
    this.random.emit();
  }

  onMouseOver() {
    this.focus = true;
  }

  onMouseOut() {
    this.focus = false;
  }

  setVertical() {
    this.settingsService.setVertical();
    this.modeChanged.emit();
  }

  setHorizontal() {
    this.settingsService.setHorizontal();
    this.modeChanged.emit();
  }

  setGrid() {
    this.settingsService.setGrid();
    this.modeChanged.emit();
  }

  setCircles() {
    this.settingsService.setCircles();
    this.modeChanged.emit();
  }

  setPreview() {
    this.settingsService.setPreview();
    this.modeChanged.emit();
  }

  visibleAnimationDone() {
    if (!this.settingsService.visible) {
      this.settingsService.hide()
    }
  }

  constructor(private settingsService: SettingsService) {
    this.mode = settingsService.mode;
    this.focus = false;
  }

  ngOnInit() {
  }
}
