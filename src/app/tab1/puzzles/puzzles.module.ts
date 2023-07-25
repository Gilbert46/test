import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PuzzlesPageRoutingModule } from './puzzles-routing.module';

import { PuzzlesPage } from './puzzles.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PuzzlesPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PuzzlesPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class PuzzlesPageModule {}

