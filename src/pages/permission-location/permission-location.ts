import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginServiceProvider } from '../../services/login-service';
import { NavigationServiceProvider } from '../../services/navigation-service';

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
    private navigationService: NavigationServiceProvider,
  ) {
  }

  // LIFECYCLE EVENTS
  ionViewDidLoad() {
    console.log('ionViewDidLoad PermissionLocationPage');
  }

  ionViewCanEnter() {
    return this.navigationService.canEnterPage(this.navCtrl, 'PermissionLocationPage');
  }

  // CLICK EVENTS
  async activeLocation() {
    try {
      await this.loginService.updateLatLng();
    } catch (ex) { }

    console.log("PERMISSION LOCATION - ACTIVE LOCATION");
    await this.navigationService.skipLocation();
    await this.navigationService.checkRoot()
  }

  async denyLocation() {
    console.log("PERMISSION LOCATION - DENY LOCATION");
    await this.navigationService.skipLocation();
    await this.navigationService.checkRoot()
  }

}
