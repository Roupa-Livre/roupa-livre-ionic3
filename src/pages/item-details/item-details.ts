import { Component, ViewChild } from '@angular/core';
import { App, IonicPage, NavController, NavParams, Slides, ViewController, ModalController, ActionSheetController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from 'ionic-angular';
import { Apparel } from '../../models/apparel';

@IonicPage()
@Component({
	selector: 'page-item-details',
		templateUrl: 'item-details.html',
})
export class ItemDetailsPage {

	// VARS
	@ViewChild(Slides) slides: Slides;

	currentSlideIndex: number = 0;
  isMe: boolean = true;
  item: Apparel;
  disableOwnerPage: boolean = false;

	// CONSTRUCTOR
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public viewCtrl: ViewController,
		public statusBar: StatusBar,
		public platform: Platform,
		public actionSheetCtrl: ActionSheetController,
		public app: App
	) {
    this.isMe = (typeof this.navParams.get('isMe') == 'undefined') ? true : this.navParams.get('isMe');
    this.item = this.navParams.data.item;
    this.disableOwnerPage = this.navParams.data.disableOwnerPage;
		this.init();
	}

	init() {
		this.platform.ready()
		.then(() => {
			this.statusBar.hide();
		});
	}

	// LIFECYCLE EVENTS
	ionViewDidLoad() {
	}

	async openProfile(item) {
		await this.navCtrl.push('UserItemListPage', { item }, { direction: 'forward' });
    this.viewCtrl.dismiss();
	}

	slideChanged() {
		this.currentSlideIndex = this.slides.getActiveIndex();
	}

	// CLICK EVENTS
	close() {
		this.statusBar.show();
		this.viewCtrl.dismiss();
	}

	disliked() {
		this.statusBar.show();
    this.viewCtrl.dismiss();
    this.navParams.data.likeCallback(this.item);
	}

	liked() {
		this.statusBar.show();
    this.viewCtrl.dismiss();
    this.navParams.data.dislikeCallback(this.item);
	}

	doComplaint() {
		let complaintActionSheet = this.actionSheetCtrl.create({
			title: 'Deseja denunciar esta peça?',
			buttons: [
				{
					text: 'Não é uma peça',
					handler: () => {
						console.log('Option 1 clicked');
					}
				}, {
					text: 'É ofensivo',
					handler: () => {
						console.log('Option 2 clicked');
					}
				}, {
					text: 'É spam',
					handler: () => {
						console.log('Option 3 clicked');
					}
				}, {
					text: 'Outro motivo',
					handler: () => {
						console.log('Option 4 clicked');
					}
				}, {
					text: 'Cancelar',
					role: 'cancel',
					handler: () => {
						console.log('Cancel clicked');
					}
				}
			]
		});

		complaintActionSheet.present();
	}



}
