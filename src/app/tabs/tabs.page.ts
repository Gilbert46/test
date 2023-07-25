import { Component } from '@angular/core'
import { AuthService } from '../services/auth.service'
import { TranslateService } from '@ngx-translate/core'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  constructor(private authService: AuthService, private translate: TranslateModule) {}
  cadena: string = 'tab1/login'
  btTab1?: boolean

  setBtTab1(st: boolean): void {
    this.btTab1 = st;
    if (st) this.cadena = 'tab1/home/'+this.authService.auth
    else this.cadena = 'tab1/login'
  }

}

