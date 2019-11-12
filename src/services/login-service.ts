import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Push } from '@ionic-native/push/ngx';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Platform, DateTime } from 'ionic-angular';

// import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Storage } from '@ionic/storage';


import 'rxjs/add/operator/map';
import { AngularTokenService } from 'angular-token';
import { RegisteringUser } from '../models/user';
import { BaseService } from './base-service';
import { PushService } from './push-service';

@Injectable()
export class LoginServiceProvider extends BaseService {
  // CONSTRUCTOR
	constructor(http: Http, tokenService: AngularTokenService,
		private platform: Platform,
		private inAppBrowser: InAppBrowser,
    private push: Push,
    private pushService: PushService,
    private geolocation: Geolocation,
		) {
    super(http, tokenService);
  }

  public validate() : Promise<any> {
    return this.tokenService.validateToken().toPromise();
  }

	isLogged() : boolean {
		return this.tokenService.userSignedIn();
  }

  user() : any {
		return this.tokenService.currentUserData;
	}

	hasAgreed() : boolean {
		return this.isLogged() && (this.tokenService.currentUserData as any).agreed;
  }

	loginWithFacebook() {
		return new Promise((resolve, reject) => {
      this.tokenService.signInOAuth('facebook', this.inAppBrowser, this.platform)
        .subscribe((response: any) => {
          return resolve(true);
          // this.tokenService.validateToken().toPromise().then(() => {
          //   return resolve(true);
          // }, e => {
          //   console.log('ERROR LOGGING USER INTO FACEBOOK [VALIDATE] : ', e);
          //   reject(e);
          // });
        }, e => {
          console.log('ERROR LOGGING USER INTO FACEBOOK : ', e);
          reject(e);
        });
		});
  }

	login(email, password) {
		return new Promise((resolve, reject) => {
			return this.tokenService.signIn({ login: email, password }).subscribe(res => {
				resolve(res);
			}, reject);
		});
  }

  register(registeringUser: RegisteringUser) {
		return new Promise((resolve, reject) => {
			return this.tokenService.registerAccount(registeringUser).subscribe(res => {
        this.tokenService.validateToken().toPromise().then(() => resolve(res), reject);
			}, reject);
		});
	}

  async hasPushPermission() {
    return this.platform.is('cordova') && (await this.push.hasPermission()).isEnabled;
  }
  async requestPushPermission() {
    return this.pushService.init();
  }

  async tryUpdateLatLng() {
    try {
      await this.updateLatLng();
    } catch (ex) {}
  }

  async updateLatLng() {
    if (this.tokenService.userSignedIn() && this.platform.is('cordova')) {
      const posOptions = { timeout: 10000, enableHighAccuracy: true };
      const position = await this.geolocation.getCurrentPosition(posOptions);

      const lat  = position.coords.latitude;
      const lng = position.coords.longitude;

      await this.updateAccount({ lat, lng });
    }
  }

  public async updateAccount(updatedData) {
    const result = await this.put('auth', updatedData);
    if (result && result.data)
      Object.assign(this.tokenService.currentUserData, result.data);
    return result;
  }

  async agreeToTerms() {
    const result = await this.post('users/agreed_to_terms', {});
    Object.assign(this.tokenService.currentUserData, { agreed: true });
    return result;
  }

  async reset(email) {
    return await this.post('users/reset_password', { email });
  }

  registerDevice(deviceData) {
    return this.post('users/register_device', deviceData);
  }

  logout() {
    return this.tokenService.signOut().toPromise();
  }

}
