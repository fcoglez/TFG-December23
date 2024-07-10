import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { CarouselComponent } from './carousel/carousel.component';
import { ListGroupComponent } from './list-group/list-group.component';

@NgModule({
  declarations: [
    CarouselComponent,
    ListGroupComponent
  ],
  exports: [
    CarouselComponent,
    ListGroupComponent
  ],
  imports: [
    CommonModule,

  ]
})
export class ComponentsModule { }
