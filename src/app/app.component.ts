import { Component, OnInit } from '@angular/core';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('es')
    translate.use('es')
  }
  hidden: boolean = false
  time: boolean[] = [true, true, true, true, true]

  ngOnInit(): void {
    this.changeSplash()
  }
  /*
  async initSplash() {
    await SplashScreen.hide()
    await SplashScreen.show({
      showDuration: 5000,
      autoHide: true,
    })
  }*/
  changeSplash(): void {
    setTimeout(() => {
      if (!this.time[4]) {
        this.hidden = true
      }
      else if (!this.time[3]) {
        this.time[4] = false
        this.changeSplash()
      }
      else if (!this.time[2]) {
        this.time[3] = false
        this.changeSplash()
      }
      else if (!this.time[1]) {
        this.time[2] = false
        this.changeSplash()
      }
      else if (!this.time[0]) {
        this.time[1] = false
        this.changeSplash()
      }
      else {
        this.time[0] = false;
        this.changeSplash()
      }
    }, 500);
  }

}
