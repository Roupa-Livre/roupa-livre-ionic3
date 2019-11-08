import { Injectable } from '@angular/core';

import { ToastController, Platform } from 'ionic-angular';
import { Toast } from '@ionic-native/toast/ngx';

@Injectable()
export class ToastService {

	// CONSTRUCTOR
  constructor(
    private platform: Platform,
    private toast: Toast,
    private toastCtrl: ToastController) {
	}

	showError(errorMessage) {
    this.platform.ready().then(() => {
      this.toastCtrl.create({
        message: errorMessage,
        duration: 3000,
        position: 'middle'
      }).present();
      // if (this.platform.is('cordova')) {
      //   this.toast.showLongCenter(errorMessage);
      // } else {
      //   this.toastCtrl.create({
      //     message: errorMessage,
      //     duration: 3000,
      //     position: 'middle'
      //   }).present();
      // }
    });
  }

  showMessage(errorMessage) {
    this.platform.ready().then(() => {
      this.toastCtrl.create({
        message: errorMessage,
        duration: 3000,
        position: 'middle'
      }).present();
      // if (this.platform.is('cordova')) {
      //   this.toast.showLongCenter(errorMessage);
      // } else {
      //   this.toastCtrl.create({
      //     message: errorMessage,
      //     duration: 3000,
      //     position: 'middle'
      //   }).present();
      // }
    });
	}

}
