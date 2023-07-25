import { Component, OnInit, numberAttribute } from '@angular/core';
import { IonImg } from '@ionic/angular';
import { randomInt } from 'crypto';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-time',
  templateUrl: './time.page.html',
  styleUrls: ['./time.page.scss'],
})
export class TimePage implements OnInit {

  constructor() { }

  public time: number = 600

  public casetes: string[] = []
  public image: string[] = []

  public imgPos: string = ''
  public gamming: boolean = false

  ngOnInit() {
    const timeTxt =  document.getElementById('time')! as HTMLDivElement
    timeTxt.innerHTML = '' + this.converTime(this.time)
    this.casetesFloch()
  }

  public timerFlag(): void {
    if (this.gamming) {
      setTimeout(() => {
        this.time -= 1
        const timeText =  document.getElementById('time')! as HTMLDivElement
        timeText.innerHTML = '' + this.converTime(this.time)
        this.timerFlag()
      }, 1000)
    }
  }

  public converTime(tm: number): string {
    let timeTx = ''
    let minute = Math.ceil( tm / 60 ) - 1
    if (tm - minute * 60 == 60) minute += 1
    let second = tm  - minute * 60
    if (second < 10) timeTx = '' + minute + ':0' + second
    else timeTx = '' + minute + ':' + second
    return timeTx
  }

  public casetesFloch(): void {
    let cont: number = 0
    let rand: number = 4
    while (rand  > 3) {
      rand = Math.ceil(Math.random() * 1)
    }
    this.image[rand] = 'explosion.png'
    while (cont < 3) {
      cont += 1
      if (rand < 3) rand += 1
      else rand = 0
      if (cont == 1) this.image[rand] = 'monteny.png'
      else if (cont == 2) this.image[rand] = 'romboider.png'
      else if (cont == 3) this.image[rand] = 'triangle.png'
    }
    for (let e=0; e < 16; e++) {
      if (e < 4) this.casetes[e] = '../../../../assets/img/'+this.image[0]
      else if (e < 8) this.casetes[e] = '../../../../assets/img/'+this.image[1]
      else if (e < 12) this.casetes[e] = '../../../../assets/img/'+this.image[2]
      else if (e < 16) this.casetes[e] = '../../../../assets/img/'+this.image[3]
    }

  }
  startGame(): void {
    this.gamming = true
    this.timerFlag()
  }

  endGame(): void {
    this.gamming = false
    this.time = 600
  }

}

