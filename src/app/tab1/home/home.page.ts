import { Component, EnvironmentInjector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';
import { TabsPage } from '../../tabs/tabs.page';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
//import { ActionPerformed, PushNotificationSchema, PushNotifications, Token } from '@capacitor/push-notifications';
import { PushService } from 'src/app/services/push.service';
import { Geolocation } from '@capacitor/geolocation';
import { MapsService } from 'src/app/services/maps.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})

export class Home1Page implements OnInit {
  user: User={email:'',password:'',name:'',adrece:'',phone:'',id:'',filepath:'',webviewPath:''}
  constructor(private authService: AuthService, private router: Router, public tabsPage: TabsPage, public pushService: PushService ) {}
  localition = { lat: 52, lng: 1.25}
  map!: google.maps.Map
  dades: any

  ngOnInit(): void {
    this.tabsPage.setBtTab1(true)
    this.initUser()
  }
  async initUser() {
    const idField = String(this.authService.idx);
    this.authService.getUsuari(idField).subscribe(res => {this.user={email:res.email,password:res.password,name:res.name,adrece:res.adrece,phone:res.phone,id:res.id,filepath:res.filepath, webviewPath:res.webviewPath};})
    this.dades = await this.geolocUser()
    this.sincronMap()
    /*
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') PushNotifications.register();
    });
    PushNotifications.addListener('registration', (token: Token) => {
      alert('Push registration success, token: ' + token.value);
    });
    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    });
    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
        alert('Push received: ' + JSON.stringify(notification));
    },
    );
    PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
    },
    );
    */
  }

  async geolocUser() {
    const coordinates = await Geolocation.getCurrentPosition()
    return coordinates
  }
  async sincronMap() {
    const promise=new Promise((resolve, reject) => {resolve(123)})
    promise.then(() => {
      setTimeout(() => {
        this.createMap()
      }, 500)
    })
  }

  async createMap() {
    const mapRef = document.getElementById('map')!;
    const newMap = await GoogleMap.create({id: 'my-map', element: mapRef, apiKey: environment.firebase.apiKey,
      config: {center: {lat: this.dades.coords.latitude, lng :this.dades.coords.longitude},zoom: 15,},
    })
    const markerId = await newMap.addMarker({
      coordinate: {lat: this.dades.coords.latitude,lng: this.dades.coords.longitude}
    })
    await newMap.setCamera({
      coordinate: {lat: this.dades.coords.latitude,lng: this.dades.coords.longitude}
    })
    await newMap.enableClustering();
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


