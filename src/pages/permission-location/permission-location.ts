import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginServiceProvider } from '../../services/login-service';
import { NavigationServiceProvider } from '../../services/navigation-service';
import { ToastService } from '../../services/toast-service';

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
    private toastService: ToastService,
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
    console.log("PERMISSION LOCATION - ACTIVE LOCATION");
    const loading = await this.toastService.showSimpleLoading();
    try {
      try {
        await this.loginService.updateLatLng();
      } catch (ex) { }

      await this.navigationService.skipLocation();
      await this.navigationService.checkRoot()
    } finally {
      loading.dismiss();
    }
  }

  async denyLocation() {
    console.log("PERMISSION LOCATION - DENY LOCATION");
    const loading = await this.toastService.showSimpleLoading();
    try {
      await this.navigationService.skipLocation();
      await this.navigationService.checkRoot()
    } finally {
      loading.dismiss();
    }
  }

}
