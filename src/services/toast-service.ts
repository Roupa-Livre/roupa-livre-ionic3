import { Injectable } from '@angular/core';

import { ToastController, Platform, LoadingController } from 'ionic-angular';

@Injectable()
export class ToastService {

	// CONSTRUCTOR
  constructor(
    private platform: Platform,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController) {
	}

	showError(errorMessage) {
    this.platform.ready().then(() => {
      this.toastCtrl.create({
        message: errorMessage,
        duration: 3000,
        position: 'middle'
      }).present();
    });
  }

  showMessage(errorMessage) {
    this.platform.ready().then(() => {
      this.toastCtrl.create({
        message: errorMessage,
        duration: 3000,
        position: 'middle'
      }).present();
    });
  }

  async showSimpleLoading(message = null) {
    let loading = this.loadingCtrl.create({
      content: message || 'Carregando ...'
    });
    await loading.present();

    return loading;
  }

}
