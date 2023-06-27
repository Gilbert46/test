import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GraphicPageRoutingModule } from './graphic-routing.module';

import { GraphicPage } from './graphic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GraphicPageRoutingModule
  ],
  declarations: [GraphicPage]
})
export class GraphicPageModule {}
