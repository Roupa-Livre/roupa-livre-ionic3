import { Injectable } from '@angular/core';

import { NavController, Events, ModalController } from 'ionic-angular';

import { AngularTokenService } from 'angular-token';

// import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Storage } from '@ionic/storage';


import 'rxjs/add/operator/map';
import { LoginServiceProvider } from './login-service';
import { ChatServiceProvider } from './chat-service';
import { ItemServiceProvider } from './item-service';

@Injectable()
export class NavigationServiceProvider {

	// CONSTRUCTOR
  constructor(private tokenService: AngularTokenService,
    private loginService: LoginServiceProvider,
    private chatService: ChatServiceProvider,
    private itemService: ItemServiceProvider,
    private storage: Storage,
    private events: Events,
    public modalCtrl: ModalController,
		) {
  }

	async getRootPage() {
    const userData: any = this.tokenService.currentUserData || (await this.tokenService.validateToken().toPromise() ? this.tokenService.currentUserData : null);
		if (userData) {
			if (!userData.agreed) {
				return 'TermsPage';
			} else if (!(await this.hasLocationPermission()) && !(await this.hasSawLocation())) {
        return 'PermissionLocationPage';
      } else if (!(await this.hasPushPermission()) && !(await this.hasSawPush())) {
        return 'PermissionNotificationPage';
      } else if (!(await this.hasSawWhatYouReleasePage())) {
        return 'WhatYouReleasePage';
      } else {
        return 'ItemExplorePage';
      }
		} else {
      console.log('PublicPage');
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

  async hasSawWhatYouReleasePage() {
    return this.hasLocallySaw('WhatYouRelease');
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
  async skipWhatYouRelease() {
    await this.storage.set('WhatYouRelease', true);
  }

  async checkRoot(direction = 'forward') {
    const rootPage = await this.getRootPage();
    this.events.publish('check-root', { newRoot: rootPage, direction })
  }

	async checkMatching(item, likeResult) : Promise<any> {
    if (likeResult.chat) {
      return new Promise<boolean>((resolve, reject) => {
        this.chatService.getChat(likeResult.chat.id).then(chat => {
          let modalMatched = this.modalCtrl.create('ItemMatchedPage', { chat });
          modalMatched.onDidDismiss(resolve);
          modalMatched.present().catch(reject);
        }, reject);
      });
    }
    return Promise.resolve(false);
  }

  async like(item, navCtrl) {
    const likeResult = await this.itemService.rate(item, true);
    const goToCustom = await this.checkMatching(item, likeResult);
    if (goToCustom) {
      await navCtrl.push(goToCustom.page, goToCustom.params);
      return true;
    } else
      return false;
  }

  async dislike(item) {
    return await this.itemService.rate(item, false);
  }

}
