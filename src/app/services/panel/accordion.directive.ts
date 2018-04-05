import {PanelComponent} from './panel.component';
import {ContentChildren, QueryList, Input, Directive, AfterContentInit} from '@angular/core';
@Directive({
  selector: '[chAccoridon]',
  exportAs: 'accordion'
})
export class AccordionDirective implements AfterContentInit {
  @Input() onlyOneOpen;

  @ContentChildren(PanelComponent) panels: QueryList<PanelComponent>;

  ngAfterContentInit() {
    console.log('INIT ACCORDION', this.panels.toArray());
    this.panels.forEach((panel) => {
      panel.open = false;
      panel.panelToggled.subscribe(tmpPanel => {
        if (tmpPanel.open && this.onlyOneOpen) {
          this.closeOthers(tmpPanel);
        }
      });
    });
  }

  closeOthers(opened) {
    console.log('Close others');
    for (const panel of this.panels.toArray()) {
      if (opened !== panel && panel.open) {
        panel.open = false;
      }
    }
  }

  closeAll() {
    console.log(this.panels.toArray());
    for (const panel of this.panels.toArray()) {
      panel.open = false;
    }
  }
}
