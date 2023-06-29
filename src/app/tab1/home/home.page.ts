import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';
import { TabsPage } from '../../tabs/tabs.page';
import { GoogleMap } from '@capacitor/google-maps';


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
    /*let map: google.maps.Map = new google.maps.Map(document.getElementById('map')!, {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8,
      mapId: String(this.authService.idx)
    });*/
    const apiKey = 'pb=!1m10!1m8!1m3!1d14173.96144885041!2d2.1629522!3d41.3775599!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sca!2ses!4v1458059080580';
    const mapRef = document.getElementById('map')!;
    mapRef.setAttribute('src', 'https://www.google.com/maps/embed?'+apiKey)
    /*
    const newMap = await GoogleMap.create({
      id: 'my-map',
      element: mapRef,
      apiKey: apiKey,
      config: {
        center: {lat: 33.6,lng: -117.9,},
        zoom: 8,
      },
    });*/
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
