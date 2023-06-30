import { Component, EnvironmentInjector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';
import { TabsPage } from '../../tabs/tabs.page';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class Home1Page implements OnInit {
  user: User={email:'',password:'',name:'',adrece:'',phone:'',id:''}
  constructor(private authService: AuthService, private router: Router, public tabsPage: TabsPage) {}

  ngOnInit(): void {
    this.tabsPage.setBtTab1(true)
    this.initUser()
  }
  async initUser() {
    const idField = String(this.authService.idx);
    this.authService.getUsuari(idField).subscribe(res => {this.user={email:res.email,password:res.password,name:res.name,adrece:res.adrece,phone:res.phone,id:res.id};});
    this.sincronMap()
  }

  async sincronMap() {
    const promise=new Promise((resolve, reject) => {resolve(123)})
    promise.then(() => {
      setTimeout(() => {
        this.createMap()
      },500)
    })
  }
  async createMap() {
    const mapRef = document.getElementById('map')!;
    const newMap = await GoogleMap.create({
      id: 'my-map',
      element: mapRef,
      apiKey: environment.firebase.apiKey,
      config: {
        center: {lat: 41.41,lng: 2.025},
        zoom: 8,
      },
    });
  }
  optionMenu(n: number): void {
    if (n == 1) this.router.navigateByUrl('/tab1/puzzles/'+this.authService.auth, { replaceUrl: true })
    if (n == 2) this.router.navigateByUrl('/tab1/new/'+this.authService.auth, { replaceUrl: true })
    if (n == 3) this.router.navigateByUrl('/tab1/graphic/'+this.authService.auth, { replaceUrl: true })
    if (n == 4) this.router.navigateByUrl('/tab1/user/'+this.authService.auth, { replaceUrl: true })
  }
  LogOut(): void {
    this.tabsPage.setBtTab1(false)
    this.router.navigateByUrl('/tab1/login', { replaceUrl: true })
    this.authService.logout()
  }
}
