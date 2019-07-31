import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavigationServiceProvider } from '../../services/navigation-service';
import { LoginServiceProvider } from '../../services/login-service';

@IonicPage()
@Component({
  selector: 'page-permission-notification',
  templateUrl: 'permission-notification.html',
})
export class PermissionNotificationPage {

  // CONSTRUCTOR
  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private navigationService: NavigationServiceProvider,
    private loginService: LoginServiceProvider,
  ) {
  }

  // LIFECYCLE EVENTS
  ionViewDidLoad() {
    console.log('ionViewDidLoad PermissionNotificationPage');
  }

  ionViewCanEnter() {
    return this.navigationService.canEnterPage(this.navCtrl, 'PermissionNotificationPage');
  }

  // CLICK EVENTS
  async activePermission() {
    console.log("PERMISSION NOTIFICATION - ACTIVE NOTIFICATION");
    try {
      await this.loginService.requestPushPermission();
    } catch (ex) { }

    await this.navigationService.skipPush();
    this.navigationService.checkRoot('forward');
  }

  async denyPermission() {
    await this.navigationService.skipPush();

    console.log("PERMISSION NOTIFICATION - DENY NOTIFICATION");
    this.navCtrl.push("WhatYouReleasePage", {}, {
			direction: 'forward'
		});
  }

}
