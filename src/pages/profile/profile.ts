import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemServiceProvider } from '../../services/item-service';
import { Apparel } from '../../models/apparel';
import { ApiArray } from '../../models/api-array';

@IonicPage()
@Component({
	selector: 'page-profile',
	templateUrl: 'profile.html',
})
export class ProfilePage {

  public items: ApiArray<Apparel>;

	// CONSTRUCTOR
	constructor(
		public navCtrl: NavController,
    public navParams: NavParams,
    private itemsService: ItemServiceProvider
	) {
	}

	// LIFECYCLE EVENTS
	ionViewDidLoad() {
    this.loadItems();
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
