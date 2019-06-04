import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-settings',
	templateUrl: 'settings.html',
})
export class SettingsPage {

  // CONSTRUCTOR
  constructor(
    public navCtrl: NavController,
		public navParams: NavParams,
  ) {
	}

  // LIFECYCLE EVENTS
	ionViewDidLoad() {
		console.log('ionViewDidLoad SettingsPage');
  }

  // CLICK EVENTS
  changeProfilePhoto() {
    console.log('SETTINGSPAGE - CHANGEPROFILEPHOTO');
  }

}
