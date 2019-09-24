import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-loading',
	templateUrl: 'loading.html',
})
export class LoadingPage {
  extraClass: string;
  customIconPath: string;
  customMessage: string;

	// CONSTRUCTOR
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams
	) {
    if (this.navParams.data) {
      this.extraClass = this.navParams.data.extraClass;
      this.customIconPath = this.navParams.data.customIconPath;
      this.customMessage = this.navParams.data.customMessage;
    }
	}

	// LIFECYCLE EVENTS
	ionViewDidLoad() {
	}

}
