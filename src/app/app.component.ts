import { Component, ViewChild } from "@angular/core";
import { Platform, Events, NavController, ModalController } from "ionic-angular";

import { StatusBar } from "@ionic-native/status-bar/ngx";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { Device } from '@ionic-native/device/ngx';

import { AngularTokenService } from 'angular-token';
import { LoginServiceProvider } from "../services/login-service";
import { NavigationServiceProvider } from "../services/navigation-service";
import { PushService } from "../services/push-service";
import { ChatServiceProvider } from "../services/chat-service";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  // VARS
  @ViewChild('nacContent') nacContent: NavController;
	rootPage: any;

  // CONSTRUCTOR
  constructor(
    private platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private events: Events,
    private device: Device,
    private tokenService: AngularTokenService,
    public modalCtrl: ModalController,
    public loginProvider: LoginServiceProvider,
    private navigationService: NavigationServiceProvider,
    private pushService: PushService,
    private chatService: ChatServiceProvider,
  ) {

    this.platform.ready().then(() => {
      // OKAY, SO THE PLATFORM IS READY AND OUR PLUGINS ARE AVAILABLE.
      // HERE YOU CAN DO ANY HIGHER LEVEL NATIVE THINGS YOU MIGHT NEED.

      statusBar.styleDefault();
      splashScreen.hide();
      // keyboard.disableScroll(true);
      // keyboard.hideKeyboardAccessoryBar(true);

      this.subscribeToEvents();

			if (this.tokenService.userSignedIn()) {
				this.tokenService.validateToken().toPromise().then(async res => {
          this.rootPage = await this.navigationService.getRootPage();
          if (await this.loginProvider.hasPushPermission()) {
            this.pushService.init();
          }
				}, error => {
					// console.log('validateToken err', error);
          this.rootPage = 'PublicPage';
				})
			} else {
        this.rootPage = 'PublicPage';
			}
    });
  }

  private onPushRegistration(registrationData) {
    if (this.platform.is('cordova')) {
      var postData = { registration_id: registrationData.registrationId, provider: null, device_uid: this.device.uuid }
      if (this.platform.is('ios')) {
        postData.provider = 'ios';
      } else if (this.platform.is('android')) {
        postData.provider = 'android';
      }

      if (postData.provider != null) {
        this.loginProvider.registerDevice(postData);
      }
    }
  }

  private async onPushNotification(data) {
    if (data.hasOwnProperty('additionalData')) {
      if (data.additionalData.type == 'message') {
        if (!data.additionalData.foreground) {
          const chat = this.chatService.getChat(data.additionalData.chat.id);
          this.nacContent.push('ChatPage', { chat, id: data.additionalData.chat_id });
        }
      } else if (data.additionalData.type == 'match') {
        const chat = this.chatService.getChat(data.additionalData.chat.id);
        let modalMatched = this.modalCtrl.create('ItemMatchedPage', { chat });
        modalMatched.present();
      }
    }
  }

  subscribeToEvents() {
    this.events.subscribe('check-root', data => {
      this.rootPage = data.newRoot;
    });
    this.events.subscribe('on-push-registration', registrationData => {
      this.onPushRegistration(registrationData);
    });
    this.events.subscribe('on-push-notification', notificationData => {
      this.onPushNotification(notificationData);
    });
  }
}
