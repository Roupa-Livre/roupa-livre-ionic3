import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ItemSearcherService } from '../../services/item-searcher-service';

@IonicPage()
@Component({
	selector: 'page-item-not-found',
	templateUrl: 'item-not-found.html',
})
export class ItemNotFoundPage {

  public hasFilter;

	// CONSTRUCTOR
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
    public viewCtrl: ViewController,
    private itemSearchService: ItemSearcherService,
	) {
	}

	// LIFECYCLE EVENTS
	ionViewDidLoad() {
    this.hasFilter = this.itemSearchService.hasFilter();
	}

	// CLICK EVENTS
	offerNewItem() {
		this.viewCtrl.dismiss({ page: 'ItemFormPage', params: {}, removeNav: true });
	}

	close() {
    this.viewCtrl.dismiss();
	}

}
