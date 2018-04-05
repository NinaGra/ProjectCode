import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PanelComponent, PanelHeaderDirective} from './panel.component';
import {AccordionDirective} from './accordion.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ PanelComponent, PanelHeaderDirective, AccordionDirective],
  exports: [ PanelComponent, PanelHeaderDirective, AccordionDirective],
})
export class PanelModule {
}
