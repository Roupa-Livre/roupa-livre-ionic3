import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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

import { ImageCompressService,ResizeOptions,ImageUtilityService } from 'ng2-image-compress';

import { AngularTokenModule } from 'angular-token';

import { ItemServiceProvider } from '../services/item-service';
import { LoginServiceProvider } from '../services/login-service';
import { ChatServiceProvider } from '../services/chat-service';

import { MyApp } from './app.component';

import { DirectivesModule } from '../directives/directives.module';
import { ComponentsModule } from '../components/components.module';
import { ToastService } from '../services/toast-service';
import { Environment } from '../config/environment';
import { ItemSearcherService } from '../services/item-searcher-service';
import { PipesModule } from '../pipes/pipes.module';
import { PropertyGroupService } from '../services/property-group-service';

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
			apiBase: Environment.API_URL,
			signOutFailedValidate: true,
			oAuthBase: Environment.API_URL,
			oAuthWindowType: 'inAppBrowser',
			oAuthPaths: {
				facebook: 'auth/facebook'
			},
			oAuthBrowserCallbacks: {
				facebook: 'auth/facebook/callback'
			},
		}),
		HttpClientModule,
		DirectivesModule,
    ComponentsModule,
    PipesModule,
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
    ItemSearcherService,
		LoginServiceProvider,
    AngularTokenModule,
		ToastService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ChatServiceProvider,
    PropertyGroupService,
    ImageCompressService,
    ResizeOptions,
	]
})
export class AppModule {}
