import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { DirectivesModule } from '../directives/directives.module';
import { ComponentsModule } from '../components/components.module';
import { ImagePicker } from '@ionic-native/image-picker';

import { ExplorePage } from '../pages/explore/explore';
import { WelcomePage } from '../pages/welcome/welcome';
import { MatchedPage } from '../pages/matched/matched';
import { MePage } from '../pages/me/me';
import { ProfilePage } from '../pages/profile/profile';
import { ProfileEditPage } from '../pages/profile-edit/profile-edit';
import { InstagramPhotoPage } from '../pages/instagram-photo/instagram-photo';
import { SettingsPage } from '../pages/settings/settings' ;
import { MessagingPage } from '../pages/messaging/messaging';
import { ChatPage } from '../pages/chat/chat';
import { TinderPlusPage } from '../pages/tinder-plus/tinder-plus';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { SwingModule } from 'angular2-swing';
import { ElasticModule } from 'ng-elastic';

@NgModule({
  declarations: [
    MyApp,
    ExplorePage,
    WelcomePage,
    MatchedPage,
    MePage,
    ProfilePage,
    ProfileEditPage,
    InstagramPhotoPage,
    SettingsPage,
    MessagingPage,
    ChatPage,
    TinderPlusPage
  ],
  imports: [
    BrowserModule,
    SwingModule,
    ElasticModule,
    DirectivesModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp, {
      mode: 'ios',// TODO: to have same iOS look for all platforms
      backButtonText: '',
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ExplorePage,
    WelcomePage,
    MatchedPage,
    MePage,
    ProfilePage,
    ProfileEditPage,
    InstagramPhotoPage,
    SettingsPage,
    MessagingPage,
    ChatPage,
    TinderPlusPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    ImagePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
