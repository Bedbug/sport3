import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


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
// Ngb-Boostrap components
import { NgbAccordionComponent } from './ng-bootstrap/accordion/accordion.component';
import { NgbAlertComponent } from './ng-bootstrap/alert/alert.component';
import { NgbButtonsComponent } from './ng-bootstrap/buttons/buttons.component';
import { NgbCarouselComponent } from './ng-bootstrap/carousel/carousel.component';
import { NgbCollapseComponent } from './ng-bootstrap/collapse/collapse.component';
import { NgbDatepickerComponent } from './ng-bootstrap/datepicker/datepicker.component';
import { NgbDropdownComponent } from './ng-bootstrap/dropdown/dropdown.component';
import { NgbModalComponent } from './ng-bootstrap/modal/modal.component';
import { NgbPaginationComponent } from './ng-bootstrap/pagination/pagination.component';
import { NgbPopoverComponent } from './ng-bootstrap/popover/popover.component';
import { NgbProgressbarComponent } from './ng-bootstrap/progressbar/progressbar.component';
import { NgbRatingComponent } from './ng-bootstrap/rating/rating.component';
import { NgbTabsetComponent } from './ng-bootstrap/tabset/tabset.component';
import { NgbTimepickerComponent } from './ng-bootstrap/timepicker/timepicker.component';
import { NgbTooltipComponent } from './ng-bootstrap/tooltip/tooltip.component';
import { NgbTypeaheadComponent } from './ng-bootstrap/typeahead/typeahead.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'accordion',
        component: AccordionsComponent
      },
      {
        path: 'alert',
        component: AlertComponent
      },
      {
        path: 'dropdown',
        component: DropdownComponent
      },
      {
        path: 'grid',
        component: GridComponent
      },
      {
        path: 'helper-class',
        component: HelperClassesComponent
      },
      {
        path: 'list',
        component: ListComponent
      },
      {
        path: 'modal',
        component: ModalComponent
      },
      {
        path: 'navs',
        component: NavsComponent
      },
      {
        path: 'popover',
        component: PopoverComponent
      },
      {
        path: 'progressbar',
        component: ProgressbarComponent
      },
      {
        path: 'shadow',
        component: ShadowComponent
      },
      {
        path: 'spinners',
        component: SpinnersComponent
      },
      {
        path: 'state-color',
        component: StateColorComponent
      },
      {
        path: 'tabs',
        component: TabsComponent
      },
      {
        path: 'tag-n-pills',
        component: TagNPillsComponent
      },
      {
        path: 'typography',
        component: TypographyComponent
      },
       {
        path: 'ngb/accordion',
        component: NgbAccordionComponent
      },
      {
        path: 'ngb/alert',
        component: NgbAlertComponent
      },  
      {
        path: 'ngb/buttons',
        component: NgbButtonsComponent
      }, 
      {
        path: 'ngb/carousel',
        component: NgbCarouselComponent
      },
      {
        path: 'ngb/collapse',
        component: NgbCollapseComponent
      },  
      {
        path: 'ngb/datepicker',
        component: NgbDatepickerComponent
      },
      {
        path: 'ngb/dropdown',
        component: NgbDropdownComponent
      },
      {
        path: 'ngb/modal',
        component: NgbModalComponent
      },
      {
        path: 'ngb/pagination',
        component: NgbPaginationComponent
      },
      {
        path: 'ngb/popover',
        component: NgbPopoverComponent
      },
      {
        path: 'ngb/progressbar',
        component: NgbProgressbarComponent
      },
      {
        path: 'ngb/rating',
        component: NgbRatingComponent
      },
      {
        path: 'ngb/tabset',
        component: NgbTabsetComponent
      },
      {
        path: 'ngb/timepicker',
        component: NgbTimepickerComponent
      },
      {
        path: 'ngb/tooltip',
        component: NgbTooltipComponent
      },
      {
        path: 'ngb/typeahead',
        component: NgbTypeaheadComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule { }
