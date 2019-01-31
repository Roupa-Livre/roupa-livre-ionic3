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
      if (this.platform.is('cordova')) {
        this.toast.show(errorMessage, '3000', 'center');
      } else {
        this.toastCtrl.create({
          message: errorMessage,
          duration: 3000,
          position: 'middle'
        }).present();
      }
    });
	}

}
