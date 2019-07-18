import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Geolocation } from '@ionic-native/geolocation/ngx';

import { InAppBrowser, InAppBrowserEvent, InAppBrowserObject, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { Platform } from 'ionic-angular';

// import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Storage } from '@ionic/storage';


import 'rxjs/add/operator/map';
import { AngularTokenService } from 'angular-token';
import { RegisteringUser } from '../models/user';
import { BaseService } from './base-service';

@Injectable()
export class LoginServiceProvider extends BaseService {

	// CONSTRUCTOR
	constructor(http: Http, tokenService: AngularTokenService,
		private platform: Platform,
		private inAppBrowser: InAppBrowser,
		private storage: Storage,
    // private fb: Facebook,
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

	getInitialPage() {
		const userData: any = this.tokenService.currentUserData;
		if (userData) {
			if (userData.agreed) {
				return 'ItemExplorePage';
			} else {
				return 'TermsPage';
			}
		} else {
			return 'PublicPage';
		}
	}

	loginWithFacebook() {
		return new Promise((resolve, reject) => {
      return this.tokenService.signInOAuth('facebook', this.inAppBrowser, this.platform)
        .subscribe((response: any) => {
          // console.log('USER LOGGED INTO FACEBOOK - RESPONSE : ', response);
          // throw 'err';
          return resolve(true);
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
				resolve(res);
			}, reject);
		});
	}

	isFirstTime() : Promise<boolean> {

		return new Promise(resolve => {

			this.storage.get('firstLogin')
			.then((value) => {

				if (value == false) {
					resolve(false);
				} else {
					this.storage.set('firstLogin', false);
					resolve(true);
				}
			});

		});
  }

  async requuestPushPermission() {
    // TODO
  }

  async updateLatLng() {
    if (this.tokenService.userSignedIn()) {
      const posOptions = { timeout: 10000, enableHighAccuracy: true };
      const position = await this.geolocation.getCurrentPosition(posOptions);

      const lat  = position.coords.latitude;
      const lng = position.coords.longitude;

      await this.updateAccount({ lat, lng });
    }
  }

  public async updateAccount(updatedData) {
    const result = await this.put('auth', updatedData);
    Object.assign(this.tokenService.currentUserData, updatedData);
    return result;
  }

}
