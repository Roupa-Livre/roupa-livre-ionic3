import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-permission-notification',
  templateUrl: 'permission-notification.html',
})
export class PermissionNotificationPage {

  // CONSTRUCTOR
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  // LIFECYCLE EVENTS
  ionViewDidLoad() {
    console.log('ionViewDidLoad PermissionNotificationPage');
  }

  // CLICK EVENTS
  activePermission() {
    console.log("PERMISSION NOTIFICATION - ACTIVE NOTIFICATION");
    // TODO : ACTIVATE NOTIFICATIONS
    this.navCtrl.setRoot("WhatYouReleasePage", {}, {
			direction: 'forward'
		});
  }

  denyPermission() {
    console.log("PERMISSION NOTIFICATION - DENY NOTIFICATION");
    this.navCtrl.setRoot("WhatYouReleasePage", {}, {
			direction: 'forward'
		});
  }

}
