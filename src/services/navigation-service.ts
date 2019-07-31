import { Injectable } from '@angular/core';

import { NavController, Events } from 'ionic-angular';

import { AngularTokenService } from 'angular-token';

// import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Storage } from '@ionic/storage';


import 'rxjs/add/operator/map';
import { LoginServiceProvider } from './login-service';

@Injectable()
export class NavigationServiceProvider {

	// CONSTRUCTOR
  constructor(private tokenService: AngularTokenService,
    private loginService: LoginServiceProvider,
    private storage: Storage,
    private events: Events,
		) {
  }

	async getRootPage() {
    const userData: any = this.tokenService.currentUserData;
		if (userData) {
			if (!userData.agreed) {
				return 'TermsPage';
			} else if (!(await this.hasLocationPermission()) && !(await this.hasSawLocation())) {
        return 'PermissionLocationPage';
      } else if (!(await this.hasPushPermission()) && !(await this.hasSawPush())) {
        return 'PermissionNotificationPage';
      } else {
        return 'ItemExplorePage';
      }
		} else {
			return 'PublicPage';
		}
  }

  async canEnterPage(nav: NavController, page, redirect = true) {
    const rootPage = await this.getRootPage();
    const canEnter = (rootPage === page);
    if (!canEnter) {
      if (page == 'PermissionLocationPage' || page == 'PermissionNotificationPage') {
        return true;
      }
      else if (redirect) {
        this.events.publish('check-root', { newRoot: rootPage })
        nav.popToRoot();
      }
    }
    return canEnter;
  }

  async canAccessMainLoggedContent() {
    return await this.getRootPage() == 'ItemExplorePage';
  }

  async hasPushPermission() {
    try {
      await this.loginService.hasPushPermission();
    } catch(ex) {
      return false;
    }
  }

  async hasLocationPermission() {
    try {
      (await this.loginService.updateLatLng());
      return true;
    } catch(ex) {
      return false;
    }
  }

  async hasSawPush() {
    return this.hasLocallySaw('pushPerm');
  }

  async hasSawLocation() {
    return this.hasLocallySaw('locationPerm');
  }

	async hasLocallySaw(sawKey) : Promise<boolean> {
    try {
      const value = await this.storage.get(sawKey);
      if (value)
        return value;
    } catch(ex) { }

    return false;
  }

  async skipLocation() {
    await this.storage.set('locationPerm', true);
  }
  async skipPush() {
    await this.storage.set('pushPerm', true);
  }

  async checkRoot(direction = 'foward') {
    const rootPage = await this.getRootPage();
    this.events.publish('check-root', { newRoot: rootPage, direction })
  }

}
