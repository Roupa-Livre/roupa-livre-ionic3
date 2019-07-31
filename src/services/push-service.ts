import { Injectable } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { Push, PushObject } from '@ionic-native/push/ngx';
import { Environment } from '../config/environment';

@Injectable()
export class PushService {

  pushObject: PushObject;
  pushInit = false;

	// CONSTRUCTOR
  constructor(
    private platform: Platform,
    private push: Push,
    private events: Events) {
	}

	async init() : Promise<boolean> {
    await this.platform.ready();
    if (this.platform.is('cordova')) {
      const permission = await this.push.hasPermission();
      if (!permission.isEnabled)
        return false;

      if (!this.pushInit) {
        this.pushInit = true;
        try {
          this.pushObject = this.push.init({
            android: {
              senderID: Environment.SENDER_ID,
              iconColor: '#0064f0'
            },
            ios: {
              alert: "true",
              badge: "true",
              sound: "true"
            }
          });

          this.pushObject.on('registration').subscribe((registration: any) => {
            this.events.publish('on-push-registration', registration);
          });
          this.pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

          this.pushObject.on('notification').subscribe((notification: any) => {
            this.events.publish('on-push-notification', notification);
          });
        } catch(ex) {
          this.pushInit = false;
          throw ex;
        }
      }
    }
    return true;
  }

}
