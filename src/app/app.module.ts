import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 

import { IonicStorageModule } from '@ionic/storage';

import { AppVersion } from '@ionic-native/app-version/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Push } from '@ionic-native/push/ngx';
import { Toast } from '@ionic-native/toast/ngx';

import { AngularTokenModule } from 'angular-token';

import { ItemServiceProvider } from '../providers/item-service/item-service';
import { LoginServiceProvider } from '../providers/login-service/login-service';
import { ChatServiceProvider } from '../providers/chat-service/chat-service';

import { MyApp } from './app.component';

import { DirectivesModule } from '../directives/directives.module';
import { ComponentsModule } from '../components/components.module';
import { ToastService } from '../providers/utils/toast-service';

@NgModule({
	declarations: [
		MyApp
	],
	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp, {
			mode: 'ios', // TODO : to have same iOS look for all platforms
			backButtonText: '',
		}),
		IonicStorageModule.forRoot(),
		AngularTokenModule.forRoot({
			apiBase: 'http://localhost:3000',
			signOutFailedValidate: true,
			oAuthPaths: {
				github: 'auth/github'
			},
		}),
		HttpClientModule,
		DirectivesModule,
		ComponentsModule,
		AngularTokenModule,
	],
	bootstrap: [
		IonicApp
	],
	entryComponents: [
		MyApp
	],
	providers: [
		AppVersion,
    Keyboard,
    Facebook,
		ImagePicker,
		InAppBrowser,
		SplashScreen,
		StatusBar,
		Push,
		Toast,
		ItemServiceProvider,
		LoginServiceProvider,
		ToastService,
		{provide: ErrorHandler, useClass: IonicErrorHandler},
    ChatServiceProvider,
	]
})
export class AppModule {}
