import { Component, ViewChild } from "@angular/core";
import { Device } from '@ionic-native/device/ngx';
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AngularTokenService } from 'angular-token';
import { Events, ModalController, NavController, Platform } from "ionic-angular";
import { ChatServiceProvider } from "../services/chat-service";
import { LoginServiceProvider } from "../services/login-service";
import { NavigationServiceProvider } from "../services/navigation-service";
import { PushService } from "../services/push-service";
import { ToastService } from "../services/toast-service";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  // VARS
  @ViewChild('navContent') navContent: NavController;
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
    private toastService: ToastService,
  ) {

    this.platform.ready().then(() => {
      // OKAY, SO THE PLATFORM IS READY AND OUR PLUGINS ARE AVAILABLE.
      // HERE YOU CAN DO ANY HIGHER LEVEL NATIVE THINGS YOU MIGHT NEED.

      statusBar.styleDefault();
      splashScreen.hide();
      // keyboard.disableScroll(true);
      // keyboard.hideKeyboardAccessoryBar(true);

      this.subscribeToEvents();
      // this.testNotify();

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
    console.log('onPushNotification', data);
    if (data.hasOwnProperty('additionalData')) {
      if (data.additionalData.type == 'message') {
        if (!data.additionalData.foreground) {
          const chat = this.chatService.getChat(data.additionalData.chat_id);
          this.navContent.push('ChatMainPage', { chat, id: data.additionalData.chat_id });
        }
      } else if (data.additionalData.type == 'match') {
        const chat = this.chatService.getChat(data.additionalData.chat_id);
        let modalMatched = this.modalCtrl.create('ItemMatchedPage', { chat });
        modalMatched.present();
      } else if (data.additionalData.type == 'custom') {
        console.log('NotificationCustomPage');
        let modalCustom = this.modalCtrl.create('NotificationCustomPage', { notificationData: data.additionalData });
        modalCustom.onDidDismiss(data => {
          if (data && data.page) {
            this.navContent.push(data.page, data.params);
          }
        })
        modalCustom.present();
      }
    }
  }

  testNotify() {
    setTimeout(() => {
      console.log('testNotify');
      this.events.publish('on-push-notification', {
        additionalData: {
          type: 'custom',
          image_url: 'https://images.squarespace-cdn.com/content/v1/545a4cd9e4b01ba1e16be339/1510183845982-X9MADBNZERB087IB7PSA/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/background-curso.jpg?format=1500w',
          // title: 'uma notificacao custom',
          // body: '<ul><li>aqui vai meu conteudo</li>',
          // action_link: '/ChatMainPage',
          // action_title: 'seus chats',
          title: 'veja nosso site',
          body: '<ul><li>que acha de conhecer nosso site?</li>',
          action_link: 'https://roupalivre.com.br',
          action_title: 'CONHEÇA',
        }
      })
    }, 5000);
  }

  async changeRoot(newRoot) {
    const loading = await this.toastService.showSimpleLoading();
    try {
      await this.navContent.setRoot(newRoot);
      this.rootPage = newRoot;
    } finally {
      loading.dismiss();
    }
  }

  subscribeToEvents() {
    this.events.subscribe('check-root', data => {
      if (this.rootPage != data.newRoot) {
        this.changeRoot(data.newRoot);
      }
    });
    this.events.subscribe('on-push-registration', registrationData => {
      this.onPushRegistration(registrationData);
    });
    this.events.subscribe('on-push-notification', notificationData => {
      this.onPushNotification(notificationData);
    });
  }
}
