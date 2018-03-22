import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MyApp } from './app.component';

import { DirectivesModule } from '../directives/directives.module';
import { ComponentsModule } from '../components/components.module';

import { ImagePicker } from '@ionic-native/image-picker';
import { Keyboard } from '@ionic-native/keyboard';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { ApparelServiceProvider } from '../providers/apparel-service/apparel-service';
import { LoginServiceProvider } from '../providers/login-service/login-service';

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
		DirectivesModule,
		ComponentsModule,
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp
	],
	providers: [
		StatusBar,
		SplashScreen,
		Keyboard,
		ImagePicker,

		ApparelServiceProvider,
		LoginServiceProvider,

		{provide: ErrorHandler, useClass: IonicErrorHandler},
	]
})
export class AppModule {}
