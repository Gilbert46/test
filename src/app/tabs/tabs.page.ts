import { Component } from '@angular/core'
import { AuthService } from '../services/auth.service'
//import { PushService } from '../services/push.service';
//import { PushNotifications, PushNotificationsPlugin, PushNotificationSchema, ActionPerformed, Token } from '@capacitor/push-notifications';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  constructor(private authService: AuthService/*, private pushService: PushService*/) {
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

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        alert('Push received: ' + JSON.stringify(notification));
      },
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      },
    );
    */
    //console.log('test')
    //this.pushService.init()
  }

  cadena: string='tab1/login'
  btTab1?: boolean

  setBtTab1(st: boolean): void {
    this.btTab1=st;
    if (st) this.cadena='tab1/home/'+this.authService.auth
    else this.cadena='tab1/login'
  }

}

