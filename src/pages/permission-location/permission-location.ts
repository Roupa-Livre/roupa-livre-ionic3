import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginServiceProvider } from '../../services/login-service';

@IonicPage()
@Component({
  selector: 'page-permission-location',
  templateUrl: 'permission-location.html',
})
export class PermissionLocationPage {

  // CONSTRUCTOR
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loginService: LoginServiceProvider,
  ) {
  }

  // LIFECYCLE EVENTS
  ionViewDidLoad() {
    console.log('ionViewDidLoad PermissionLocationPage');
  }

  // CLICK EVENTS
  async activeLocation() {
    try {
      await this.loginService.updateLatLng();
    } catch (ex) { }

    console.log("PERMISSION LOCATION - ACTIVE LOCATION");
    // TODO : ACTIVATE THE LOCATION
    this.navCtrl.push("PermissionNotificationPage", {}, {
			direction: 'forward'
		});
  }

  denyLocation() {
    console.log("PERMISSION LOCATION - DENY LOCATION");
    this.navCtrl.push("PermissionNotificationPage", {}, {
			direction: 'forward'
		});
  }

}
