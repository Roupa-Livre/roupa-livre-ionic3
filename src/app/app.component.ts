import { Component } from "@angular/core";
import { Platform } from "ionic-angular";

import { StatusBar } from "@ionic-native/status-bar/ngx";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";

import { Push, PushObject, PushOptions } from "@ionic-native/push/ngx";

import { AngularTokenService } from 'angular-token';
import { LoginServiceProvider } from "../providers/login-service/login-service";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  // VARS
	rootPage: any;
	
	pushObject: PushObject;

  // CONSTRUCTOR
  constructor(
    private platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
		private push: Push,
		private _tokenService: AngularTokenService,
		public loginProvider: LoginServiceProvider
  ) {

    platform.ready().then(() => {
      // OKAY, SO THE PLATFORM IS READY AND OUR PLUGINS ARE AVAILABLE.
      // HERE YOU CAN DO ANY HIGHER LEVEL NATIVE THINGS YOU MIGHT NEED.

      statusBar.styleDefault();
      splashScreen.hide();
      // keyboard.disableScroll(true);
			// keyboard.hideKeyboardAccessoryBar(true);
			
			if (this._tokenService.userSignedIn()) {
				this._tokenService.validateToken().toPromise().then(res => {
					if (res.success) {
						this.rootPage = 'ItemExplorePage';
					} else {
						this.rootPage = 'PublicPage';
					}
				}, error => {
					// console.log('validateToken err', error);
					this.rootPage = 'PublicPage';
				})
			} else {
				this.rootPage = 'PublicPage';
			}
			
			if (this.platform.is('cordova')) {
				this.push.hasPermission().then((res: any) => {
					if (res.isEnabled) {
						console.log("We have permission to send push notifications");
					} else {
						console.log("We do not have permission to send push notifications");
					}
				});
				
				this.pushObject = this.push.init({
					android: {
						iconColor: '#0064f0'
					},
					ios: {
						alert: "true",
						badge: "true",
						sound: "true"
					}
				});
	
				this.pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
				this.pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
	
				this.pushObject.on('notification').subscribe((notification: any) => {
					console.log('Received a notification', notification);
				});
			}
    });
  }
}
