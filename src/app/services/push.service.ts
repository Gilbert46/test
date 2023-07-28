import { Injectable } from '@angular/core';
import { PushNotifications, PushNotificationsPlugin, PushNotificationSchema, Token } from '@capacitor/push-notifications';

@Injectable({
  providedIn: 'root'
})
export class PushService {
  constructor() { }

  init() {
    this.addListeners();
    this.registerNotifications();
    this.getDeliveredNotifications();
  }
  async addListeners ()  {
    await PushNotifications.addListener('registration', token => {
      console.info('PUSH TEST Registration token: ', token.value);
    });

    await PushNotifications.addListener('registrationError', err => {
      console.error('PUSH TEST Registration error: ', err.error);
    });

    await PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('PUSH TEST Push notification received: ', notification);
    });

    await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
      console.log('PUSH TEST NPush notification action performed', notification.actionId, notification.inputValue);
    });
  }

  async registerNotifications () {
    let permStatus = await PushNotifications.checkPermissions();

    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }

    if (permStatus.receive !== 'granted') {
      throw new Error('User denied permissions!');
    }

    await PushNotifications.register();
    }

  async getDeliveredNotifications (){
    const notificationList = await PushNotifications.getDeliveredNotifications();
    console.log('delivered notifications', notificationList);
  }

}

