import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AppVersion } from '@ionic-native/app-version/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { initDomAdapter } from '@angular/platform-browser/src/browser';
import { AnalyticsService } from '../../services/analytics-service';

@IonicPage()
@Component({
	selector: 'page-about',
	templateUrl: 'about.html',
})
export class AboutPage {

	// VARS
	public versionNumber;

	// CONSTRUCTOR
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private appVersion: AppVersion,
    private iab: InAppBrowser,
    private analyticsService: AnalyticsService,
	) {
	}

	// LIFECYCLE EVENTS
	ionViewDidEnter() {
    this.init();
    this.analyticsService.trackPage('about');
  }

  init() {
    this.appVersion.getVersionNumber()
		.then(version => {
      console.log("ABOUTPAGE : INIT - GETVERSIONNUMBER - VERSION : ", version);
			this.versionNumber = version;
		})
		.catch(error => {
			console.log("ABOUTPAGE : INIT - GETVERSIONNUMBER - ERROR : ", error);
		});
  }

	// CLICK EVENTS
	navigate(url: string) {
		this.iab.create(url);
	}

}
