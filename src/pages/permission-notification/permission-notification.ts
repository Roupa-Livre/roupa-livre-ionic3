import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginServiceProvider } from '../../services/login-service';
import { NavigationServiceProvider } from '../../services/navigation-service';
import { ToastService } from '../../services/toast-service';

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
    private toastService: ToastService,
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
    const loading = await this.toastService.showSimpleLoading();
    try {
      try {
        await this.loginService.requestPushPermission();
      } catch (ex) { }

      await this.navigationService.skipPush();
      await this.navigationService.checkRoot('forward');
    } finally {
      loading.dismiss();
    }
  }

  async denyPermission() {
    console.log("PERMISSION NOTIFICATION - DENY NOTIFICATION");
    const loading = await this.toastService.showSimpleLoading();
    try {
      await this.navigationService.skipPush();
      await this.navigationService.checkRoot('forward');
    } finally {
      loading.dismiss();
    }
  }

}
