import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-item-search',
	templateUrl: 'item-search.html',
})
export class ItemSearchPage {

  // VARS
  public category: string = "";
  public type: string = "";
  public age: string = "";
  public size: string = "";
  public modeling: string = "";
  public pattern: string = "";
  public color: string = "";

  public distance: string = "";

	// CONSTRUCTOR
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams
	) {
    this.category = "1";
    this.type = "1";
    this.age = "1";
    this.size = "1";
    this.modeling = "1";
    this.pattern = "1";
    this.color = "1";

    this.distance = "45";
	}

	// LIFECYCLE EVENTS
	ionViewDidLoad() {
	}

	// CLICK EVENTS
	search() {
		this.navCtrl.setRoot('ItemSearchLoadingPage', {}, {
			direction: 'forward'
		});
  }

  cleanFilters() {
		console.log("ITEMSEARCHPAGE - CLEANFILTERS");
	}

}
