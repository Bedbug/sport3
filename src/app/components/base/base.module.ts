import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BaseRoutingModule } from './base-routing.module';

// Boostrap components
import { AccordionsComponent } from './bootstrap/accordions/accordions.component';
import { AlertComponent } from './bootstrap/alert/alert.component';
import { DropdownComponent } from './bootstrap/dropdown/dropdown.component';
import { GridComponent } from './bootstrap/grid/grid.component';
import { HelperClassesComponent } from './bootstrap/helper-classes/helper-classes.component';
import { ListComponent } from './bootstrap/list/list.component';
import { ModalComponent } from './bootstrap/modal/modal.component';
import { NavsComponent } from './bootstrap/navs/navs.component';
import { PopoverComponent } from './bootstrap/popover/popover.component';
import { ProgressbarComponent } from './bootstrap/progressbar/progressbar.component';
import { ShadowComponent } from './bootstrap/shadow/shadow.component';
import { SpinnersComponent } from './bootstrap/spinners/spinners.component';
import { StateColorComponent } from './bootstrap/state-color/state-color.component';
import { TabsComponent } from './bootstrap/tabs/tabs.component';
import { TagNPillsComponent } from './bootstrap/tag-n-pills/tag-n-pills.component';
import { TypographyComponent } from './bootstrap/typography/typography.component';
// Ng-bootstrap components
import { NgbAccordionComponent } from './ng-bootstrap/accordion/accordion.component';
import { NgbAlertComponent } from './ng-bootstrap/alert/alert.component';
import { NgbButtonsComponent } from './ng-bootstrap/buttons/buttons.component';
import { NgbCarouselComponent } from './ng-bootstrap/carousel/carousel.component';
import { NgbCollapseComponent } from './ng-bootstrap/collapse/collapse.component';
import { NgbDatepickerComponent } from './ng-bootstrap/datepicker/datepicker.component';
import { NgbDropdownComponent } from './ng-bootstrap/dropdown/dropdown.component';
import { NgbModalComponent, NgbdModalContent, NgbdModal1Content, NgbdModal2Content } from './ng-bootstrap/modal/modal.component';
import { NgbPaginationComponent } from './ng-bootstrap/pagination/pagination.component';
import { NgbPopoverComponent } from './ng-bootstrap/popover/popover.component';
import { NgbProgressbarComponent } from './ng-bootstrap/progressbar/progressbar.component';
import { NgbRatingComponent } from './ng-bootstrap/rating/rating.component';
import { NgbTabsetComponent } from './ng-bootstrap/tabset/tabset.component';
import { NgbTimepickerComponent } from './ng-bootstrap/timepicker/timepicker.component';
import { NgbTooltipComponent } from './ng-bootstrap/tooltip/tooltip.component';
import { NgbTypeaheadComponent } from './ng-bootstrap/typeahead/typeahead.component';


@NgModule({
  declarations: [
    AccordionsComponent, 
    AlertComponent, 
    DropdownComponent, 
    GridComponent, 
    HelperClassesComponent, 
    ListComponent,
    ModalComponent, 
    NavsComponent, 
    PopoverComponent, 
    ProgressbarComponent, 
    ShadowComponent, 
    SpinnersComponent, 
    StateColorComponent, 
    TabsComponent, 
    TagNPillsComponent, 
    TypographyComponent,
    NgbAccordionComponent, 
    NgbAlertComponent, 
    NgbButtonsComponent, 
    NgbCarouselComponent, 
    NgbCollapseComponent, 
    NgbDatepickerComponent, 
    NgbDropdownComponent, 
    NgbModalComponent, 
    NgbdModalContent, 
    NgbdModal1Content, 
    NgbdModal2Content, 
    NgbPaginationComponent, 
    NgbPopoverComponent, 
    NgbProgressbarComponent, 
    NgbRatingComponent, 
    NgbTabsetComponent, 
    NgbTimepickerComponent, 
    NgbTooltipComponent, 
    NgbTypeaheadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BaseRoutingModule
  ],
  entryComponents:[NgbdModalContent, NgbdModal1Content, NgbdModal2Content]
})
export class BaseModule { }
