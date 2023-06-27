import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  cadena: string = 'tab1/login'
  btTab1?: boolean;

  setBtTab1(st: boolean): void {
    this.btTab1 = st;
    if (st) this.cadena = 'tab1/home'
    else this.cadena = 'tab1/login'
  }
}
