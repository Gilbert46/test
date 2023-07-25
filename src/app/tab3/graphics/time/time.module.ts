import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimePageRoutingModule } from './time-routing.module';

import { TimePage } from './time.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimePageRoutingModule,
    TranslateModule
  ],
  declarations: [TimePage]
})

export class TimePageModule {}
