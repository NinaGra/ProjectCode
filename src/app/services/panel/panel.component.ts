import {
  Directive,
  Component,
  Input,
  Output,
  EventEmitter,
  ContentChild
} from '@angular/core';

@Directive({
  selector: 'panel-header'
})
export class PanelHeaderDirective {
}

@Component({
  selector: 'panel',
  templateUrl: 'panel.component.html',
  styleUrls: ['panel.component.css']
})
export class PanelComponent {

  open = false;
  @Input() title;
  @Output() panelToggled = new EventEmitter();
  @ContentChild(PanelHeaderDirective) panelHeader: PanelHeaderDirective;

  togglePanel() {
    this.open = !this.open;
    this.panelToggled.emit(this);
  }

  hasHeader() {
    return this.panelHeader != null;
  }
}

