import { Injectable } from "@angular/core";
import { Platform } from "ionic-angular";

import firebaseApp from 'firebase/app'

@Injectable()
export class AnalyticsService {
  private hasAnalyticsPlugin;
  constructor(
    // private firebaseAnalytics: AnalyticsFirebase,
    private platform: Platform) {
    this.init();
  }
  private async init() {
    await this.platform.ready();
    this.hasAnalyticsPlugin = this.platform.is('ios') || this.platform.is('android');
  }

  trackPage(pageName) {
    firebaseApp.analytics().setCurrentScreen(pageName);
    // if (this.hasAnalyticsPlugin) {
    //   this.firebaseAnalytics.setCurrentScreen(pageName);
    // } else {
    //   firebaseApp.analytics().setCurrentScreen(pageName);
    // }
    this.trackEvent('page_view', { pageName });
  }

  trackEvent(eventName, eventParams?) {
    firebaseApp.analytics().logEvent(eventName, eventParams);
    // if (this.hasAnalyticsPlugin) {
    //   this.firebaseAnalytics.logEvent(eventName, eventParams);
    // } else {
    //   firebaseApp.analytics().logEvent(eventName, eventParams);
    // }
  }
}
