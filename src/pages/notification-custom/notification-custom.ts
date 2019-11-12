import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import User from '../../models/user';
import Chat from '../../models/chat';
import { LoginServiceProvider } from '../../services/login-service';
import { DomSanitizer } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AnalyticsService } from '../../services/analytics-service';

@IonicPage()
@Component({
	selector: 'page-notification-custom',
	templateUrl: 'notification-custom.html',
})
export class NotificationCustomPage {

  public user: any;
  public data: any;
  public safeHTML;

	// CONSTRUCTOR
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
    public viewCtrl: ViewController,
    private loginService: LoginServiceProvider,
    private sanitizer: DomSanitizer,
    private iab: InAppBrowser,
    private analyticsService: AnalyticsService
	) {
    this.user = this.loginService.user();
    this.data = this.navParams.data.notificationData;
    if (this.data.body && this.data.body.length > 0) {
      this.safeHTML = this.sanitizer.bypassSecurityTrustHtml(this.data.body);
    }
	}

	// LIFECYCLE EVENTS
	ionViewDidLoad() {
  }

  ionViewDidEnter() {
    this.analyticsService.trackPage('notification-custom');
  }

  goToAction() {
    if (this.data.action_link[0] == '/')  {
      if (this.data.action_link.length > 2) {
        const queryIdx = this.data.action_link.indexOf('?');
        let page = this.data.action_link.substring(1);
        let params = { };
        if (queryIdx > -1) {
          page = this.data.action_link.substring(1, queryIdx)
          const queryParams = this.data.action_link.substring(queryIdx);
          const urlParams = new URLSearchParams(queryParams);
          urlParams.forEach((value: string, key: string) => { params[key] = value; });
        }

        this.viewCtrl.dismiss({ page, params });
      }
    } else {
      this.iab.create(this.data.action_link, '_system');
    }
  }

	close() {
		this.viewCtrl.dismiss(false);
	}
}
