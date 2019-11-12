import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemServiceProvider } from '../../services/item-service';
import { Apparel } from '../../models/apparel';
import { ApiArray } from '../../models/api-array';
import { LoginServiceProvider } from '../../services/login-service';
import { AnalyticsService } from '../../services/analytics-service';

@IonicPage()
@Component({
	selector: 'page-profile',
	templateUrl: 'profile.html',
})
export class ProfilePage {

  public user: any;
  public items: ApiArray<Apparel>;

	// CONSTRUCTOR
	constructor(
		public navCtrl: NavController,
    public navParams: NavParams,
    private itemsService: ItemServiceProvider,
    private loginService: LoginServiceProvider,
    private analyticsService: AnalyticsService
	) {
	}

	// LIFECYCLE EVENTS
	ionViewDidLoad() {
    this.loadItems();

    this.user = this.loginService.user();
  }

  ionViewDidEnter() {
    this.analyticsService.trackPage('profile');
  }

  async loadItems() {
    this.items = await this.itemsService.getOwned();
  }

	// CLICK EVENTS
  goToOfferItem(item = null){
    this.navCtrl.push('ItemFormPage', { item }, {
			direction: 'forward'
		}).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
        if (data) {
          this.loadItems();
        }
      });
    });
  }

  goToSettings() {
    this.navCtrl.push('SettingsPage', {}, {
			direction: 'forward'
		});
  }

}
